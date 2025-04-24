import { ScanResult } from '../types/scanTypes';
import { validateUrl } from '../utils/validation';
import { checkSSL } from './sslChecker';
import { getDomainInfo } from './domainInfo';
import { getIpGeolocation } from './geolocator';
import { calculateRiskLevel } from '../utils/riskCalculator';

/**
 * Main function to scan a URL and return comprehensive security information
 */
export async function scanUrl(url: string): Promise<ScanResult> {
  const validatedUrl = validateUrl(url);
  
  try {
    const response = await fetch(
      `https://urlscanner-be.onrender.com/api/url-info?url=${encodeURIComponent(validatedUrl)}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch URL info');
    
    const backendData = await response.json();

    // Map backend response to our existing format
    const sslInfo: SSLInfo = {
      valid: true, // Assuming valid if response is successful
      issuer: backendData.ssl_issuer,
      expirationDate: new Date(backendData.ssl_valid_to).toISOString()
    };

    const domainInfo: DomainInfo = {
      name: new URL(validatedUrl).hostname,
      ageInDays: 0 // Update this if backend provides domain age
    };

    const geoInfo: GeoLocationInfo = {
      ip: backendData.ip,
      country: backendData.country,
      region: backendData.region,
      city: backendData.city
    };

    const riskLevel = calculateRiskLevel({
      sslInfo,
      domainInfo,
      geoInfo
    });

    return {
      url: validatedUrl,
      ssl: sslInfo,
      domain: domainInfo,
      geolocation: geoInfo,
      riskLevel,
      timestamp: new Date().toISOString(),
      // Add metadata if needed in your types
      metadata: backendData.metadata
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Scan failed');
  }
}

/**
 * Function to save scan results to history (localStorage)
 */
export function saveScanToHistory(result: ScanResult): void {
  try {
    const history = getScanHistory();
    
    // Add to beginning of array
    history.unshift(result);
    
    // Keep only the most recent 50 scans
    const trimmedHistory = history.slice(0, 50);
    
    localStorage.setItem('urlScanHistory', JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Failed to save scan to history:', error);
  }
}

/**
 * Function to retrieve scan history
 */
export function getScanHistory(): ScanResult[] {
  try {
    const history = localStorage.getItem('urlScanHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to retrieve scan history:', error);
    return [];
  }
}