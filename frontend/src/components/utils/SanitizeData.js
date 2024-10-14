import DOMPurify from "dompurify";
export const SanitizeData = (content) => {
        return DOMPurify.sanitize(content); // Sanitize HTML content
      };