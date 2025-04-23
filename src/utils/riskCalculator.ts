import { RiskLevel, SSLInfo, DomainInfo, GeoLocationInfo } from '../types/scanTypes';

interface RiskFactors {
  sslInfo: SSLInfo;
  domainInfo: DomainInfo;
  geoInfo: GeoLocationInfo;
}

/**
 * Calculate risk level based on various security factors
 */
export function calculateRiskLevel(factors: RiskFactors): RiskLevel {
  const { sslInfo, domainInfo, geoInfo } = factors;
  
  // Assign risk points for various factors
  let riskPoints = 0;
  
  // SSL factors (0-10 points)
  if (!sslInfo.valid) {
    riskPoints += 10; // Invalid SSL is a major concern
  }
  
  // Domain age factors (0-5 points)
  if (domainInfo.ageInDays < 30) {
    riskPoints += 5; // Very new domain (less than a month old)
  } else if (domainInfo.ageInDays < 180) {
    riskPoints += 3; // Relatively new domain (less than 6 months)
  } else if (domainInfo.ageInDays < 365) {
    riskPoints += 1; // Less than a year old
  }
  
  // Geolocation factors (0-3 points)
  const highRiskCountries = ['RU', 'CN', 'KP', 'IR']; // Example list
  if (geoInfo.countryCode && highRiskCountries.includes(geoInfo.countryCode)) {
    riskPoints += 3;
  }
  
  // Calculate final risk level based on points
  if (riskPoints >= 8) {
    return 'high';
  } else if (riskPoints >= 4) {
    return 'medium';
  } else {
    return 'low';
  }
}