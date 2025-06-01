// Type definitions for pdfjs-dist v3.11.174

declare module 'pdfjs-dist' {
  export interface GlobalWorkerOptionsType {
    workerSrc: string;
  }

  export interface PDFJSStatic {
    getDocument: (source: string | ArrayBuffer | Uint8Array) => {
      promise: Promise<{
        numPages: number;
        getPage: (pageNumber: number) => Promise<{
          getTextContent: () => Promise<{
            items: Array<{
              str: string;
              dir: string;
              transform: number[];
              width: number;
              height: number;
              fontName: string;
              [key: string]: any;
            }>;
            styles?: Record<string, any>;
          }>;
          getOperatorList: () => Promise<any>;
          commonObjs: {
            get: (key: string) => { name: string };
          };
        }>;
      }>;
    };
    GlobalWorkerOptions: GlobalWorkerOptionsType;
  }

  const pdfjs: PDFJSStatic;
  export default pdfjs;
}

declare module 'pdfjs-dist/build/pdf.worker.entry' {
  const worker: string;
  export default worker;
}

// Extend the TextItem type to include our custom properties
declare module 'lib/parse-resume-from-pdf/types' {
  export interface TextItem {
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
    fontName: string;
    hasEOL?: boolean;
    [key: string]: any;
  }
}
