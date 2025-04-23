export type RiskLevel = 'low' | 'medium' | 'high';

export interface SSLInfo {
  valid: boolean;
  issuer?: string;
  expirationDate?: string;
  error?: string;
}

export interface DomainInfo {
  name: string;
  creationDate?: string;
  expirationDate?: string;
  ageInDays: number;
  registrar?: string;
}

export interface GeoLocationInfo {
  ip: string;
  country?: string;
  countryCode?: string;
  region?: string;
  city?: string;
}

export interface ScanResult {
  url: string;
  ssl: SSLInfo;
  domain: DomainInfo;
  geolocation: GeoLocationInfo;
  riskLevel: RiskLevel;
  timestamp: string;
  metadata?: {
    title?: string;
    description?: string;
    image?: string;
  };
}