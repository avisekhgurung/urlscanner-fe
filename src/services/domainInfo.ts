import { DomainInfo } from '../types/scanTypes';

/**
 * Retrieves domain registration information
 * 
 * In a real implementation, this would call a WHOIS API service
 * For this demo, we'll simulate the response
 */
export async function getDomainInfo(url: string): Promise<DomainInfo> {
  try {
    // Extract hostname from URL
    const hostname = new URL(url).hostname;
    
    // Simulate API call to get domain info
    const response = await simulateDomainLookup(hostname);
    
    return response;
  } catch (error) {
    // Return default info if there's an error
    return {
      name: getBaseDomain(url),
      ageInDays: 0
    };
  }
}

/**
 * Simulates a domain WHOIS lookup
 * In a real application, this would be an actual API call
 */
async function simulateDomainLookup(hostname: string): Promise<DomainInfo> {
  // Extract base domain (e.g., example.com from www.example.com)
  const domain = hostname.split('.').slice(-2).join('.');
  
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Generate fake data for demo purposes
      const isNew = Math.random() > 0.7; // 30% chance of a new domain
      const creationDate = new Date();
      
      if (isNew) {
        // Domain created in the last year
        creationDate.setDate(creationDate.getDate() - Math.floor(Math.random() * 300));
      } else {
        // Older domain
        creationDate.setFullYear(creationDate.getFullYear() - Math.floor(Math.random() * 10) - 1);
      }
      
      const ageInDays = Math.floor((Date.now() - creationDate.getTime()) / (1000 * 60 * 60 * 24));
      
      resolve({
        name: domain,
        creationDate: creationDate.toISOString(),
        expirationDate: new Date(creationDate.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        ageInDays,
        registrar: 'Example Registrar, Inc.'
      });
    }, 400);
  });
}

/**
 * Extract the base domain from a URL
 */
function getBaseDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.split('.');
    return parts.length > 1 ? parts.slice(-2).join('.') : hostname;
  } catch (error) {
    // If not a valid URL, return as is
    return url;
  }
}