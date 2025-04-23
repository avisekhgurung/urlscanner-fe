/**
 * Validates a URL string and returns a properly formatted URL
 * Throws an error if the URL is invalid
 */
export function validateUrl(url: string): string {
  // Trim whitespace
  let trimmedUrl = url.trim();
  
  // Check if URL is empty
  if (!trimmedUrl) {
    throw new Error('URL cannot be empty');
  }
  
  // If doesn't start with http:// or https://, prepend https://
  if (!trimmedUrl.match(/^https?:\/\//i)) {
    trimmedUrl = 'https://' + trimmedUrl;
  }
  
  try {
    // Attempt to create a URL object to validate
    const urlObj = new URL(trimmedUrl);
    
    // Check if we have a valid hostname
    if (!urlObj.hostname || urlObj.hostname === 'localhost') {
      throw new Error('Invalid hostname');
    }
    
    // Return the validated URL
    return urlObj.href;
  } catch (error) {
    throw new Error('Please enter a valid URL');
  }
}

/**
 * Extracts domain name from a URL
 */
export function extractDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    // Remove 'www.' if present
    return hostname.replace(/^www\./, '');
  } catch (error) {
    return url;
  }
}