const STOP_WORDS = [
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "should",
  "can", "could", "may", "might", "must", "and", "but", "or", "nor",
  "for", "so", "yet", "in", "on", "at", "by", "from", "to", "of", "with",
  "about", "above", "after", "again", "against", "all", "am", "as",
  "because", "before", "below", "between", "both", "during", "each",
  "few", "further", "here", "how", "if", "into", "it", "its", "itself",
  "just", "me", "more", "most", "my", "myself", "no", "not", "now",
  "once", "only", "other", "our", "ours", "ourselves", "out", "over",
  "own", "same", "she", "he", "they", "them", "their", "theirs", "themselves",
  "then", "there", "these", "this", "those", "through", "too", "under",
  "until", "up", "very", "we", "what", "when", "where", "which", "while",
  "who", "whom", "why", "won't", "work", "working", "etc", "e.g."
];

export const parseJobDescription = (jobDescriptionText: string): string[] => {
  if (!jobDescriptionText) {
    return [];
  }

  // 1. Convert to lowercase
  let processedText = jobDescriptionText.toLowerCase();

  // 2. Remove common punctuation (replace with space to separate words)
  //    Includes: . , ; : ( ) [ ] { } ! ? " ' ` ~ @ # $ % ^ & * _ - + = < > / \ |
  processedText = processedText.replace(/[.,;:()[\]{}!?\'"`~@#$%^&*_\-+=<>\/\\|]/g, " ");

  // 3. Split into words
  const words = processedText.split(/\s+/);

  // 4. Filter out stop words and empty strings
  const meaningfulWords = words.filter(word => 
    word.length > 0 && !STOP_WORDS.includes(word)
  );

  // 5. Return unique words
  return Array.from(new Set(meaningfulWords));
};
