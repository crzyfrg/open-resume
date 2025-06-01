// Import types
import type { TextItem } from './types';

// Import PDF.js types
import type { PDFJSStatic } from 'pdfjs-dist';

// Re-export types for backward compatibility
export type { TextItem } from './types';

export type TextItems = TextItem[];
type PdfjsTextItem = {
  str: string;
  dir: string;
  transform: number[];
  width: number;
  height: number;
  fontName: string;
  [key: string]: any;
};

type PDFDocumentLoadingTask = {
  promise: Promise<{
    numPages: number;
    getPage: (pageNumber: number) => Promise<{
      getTextContent: () => Promise<{ items: PdfjsTextItem[] }>;
      getOperatorList: () => Promise<any>;
      commonObjs: { get: (key: string) => { name: string } };
    }>;
  }>;
};

// Dynamic import for PDF.js to avoid server-side issues
let pdfjs: PDFJSStatic;

// Get PDF.js version from environment variable or use default
const pdfjsVersion = process.env.NEXT_PUBLIC_PDFJS_VERSION || '3.11.174';

// Create a mock PDF.js implementation
const createMockPdfJs = (): PDFJSStatic => {
  return {
    getDocument: (source: string | ArrayBuffer | Uint8Array): PDFDocumentLoadingTask => ({
      promise: Promise.resolve({
        numPages: 0,
        getPage: () => Promise.resolve({
          getTextContent: () => Promise.resolve({ 
            items: [] as PdfjsTextItem[],
            styles: {}
          }),
          getOperatorList: () => Promise.resolve(),
          commonObjs: { 
            get: () => ({ name: 'Arial' }) 
          }
        })
      })
    }),
    GlobalWorkerOptions: {
      workerSrc: `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`
    }
  } as unknown as PDFJSStatic;
};

// Initialize PDF.js based on the environment
if (typeof window !== 'undefined') {
  try {
    // In browser environment, use the full PDF.js library
    const pdfjsLib = require('pdfjs-dist');
    
    // Set up the PDF.js worker from CDN
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
    
    pdfjs = pdfjsLib;
  } catch (error) {
    console.error('Failed to load PDF.js:', error);
    // Fallback to mock implementation if loading fails
    pdfjs = createMockPdfJs();
  }
} else {
  // Server-side rendering - use mock implementation
  pdfjs = createMockPdfJs();
}

/**
 * Step 1: Read pdf and output textItems by concatenating results from each page.
 *
 * To make processing easier, it returns a new TextItem type, which removes unused
 * attributes (dir, transform), adds x and y positions, and replaces loaded font
 * name with original font name.
 *
 * @example
 * const onFileChange = async (e) => {
 *     const fileUrl = URL.createObjectURL(e.target.files[0]);
 *     const textItems = await readPdf(fileUrl);
 * }
 */
export const readPdf = async (fileUrl: string): Promise<TextItems> => {
  const pdfFile = await pdfjs.getDocument(fileUrl).promise;
  let textItems: TextItems = [];

  for (let i = 1; i <= pdfFile.numPages; i++) {
    // Parse each page into text content
    const page = await pdfFile.getPage(i);
    const textContent = await page.getTextContent();

    // Wait for font data to be loaded
    await page.getOperatorList();
    const commonObjs = page.commonObjs;

    // Convert Pdfjs TextItem type to new TextItem type
    const pageTextItems = textContent.items.map((item: PdfjsTextItem) => {
      const {
        str: text,
        dir, // Remove text direction
        transform,
        fontName: pdfFontName,
        ...otherProps
      } = item as PdfjsTextItem;
      
      if (!transform) {
        throw new Error('Text item is missing transform property');
      }

      // Extract x, y position of text item from transform.
      // As a side note, origin (0, 0) is bottom left.
      // Reference: https://github.com/mozilla/pdf.js/issues/5643#issuecomment-496648719
      const x = transform[4];
      const y = transform[5];

      // Use commonObjs to convert font name to original name (e.g. "GVDLYI+Arial-BoldMT")
      // since non system font name by default is a loaded name, e.g. "g_d8_f1"
      // Reference: https://github.com/mozilla/pdf.js/pull/15659
      const fontObj = commonObjs.get(pdfFontName);
      const fontName = fontObj.name;

      // pdfjs reads a "-" as "-­‐" in the resume example. This is to revert it.
      // Note "-­‐" is "-&#x00AD;‐" with a soft hyphen in between. It is not the same as "--"
      const newText = text.replace(/-­‐/g, "-");

      const newItem: TextItem = {
        ...otherProps,
        fontName,
        text: newText,
        x,
        y,
        width: item.width || 0,
        height: item.height || 0,
        hasEOL: false // Default value, will be updated when processing lines
      };
      return newItem;
    });

    // Some pdf's text items are not in order. This is most likely a result of creating it
    // from design softwares, e.g. canvas. The commented out method can sort pageTextItems
    // by y position to put them back in order. But it is not used since it might be more
    // helpful to let users know that the pdf is not in order.
    // pageTextItems.sort((a, b) => Math.round(b.y) - Math.round(a.y));

    // Add text items of each page to total
    textItems.push(...pageTextItems);
  }

  // Filter out empty space textItem noise
  const isEmptySpace = (textItem: TextItem) =>
    !('hasEOL' in textItem && textItem.hasEOL) && textItem.text.trim() === "";
  textItems = textItems.filter((textItem) => !isEmptySpace(textItem));

  return textItems;
};
