import React from 'react';
import { GeoLocationInfo } from '../types/scanTypes';
import { MapPin } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';

interface GeoLocationProps {
  geolocation: GeoLocationInfo;
}

function GeoLocation({ geolocation }: GeoLocationProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-full bg-muted text-muted-foreground">
        <MapPin className="h-5 w-5" />
      </div>
      <div>
        <h4 className="font-medium text-sm">Server Location</h4>
        <div className="flex items-center gap-1.5">
          {geolocation.countryCode && (
            <ReactCountryFlag
              countryCode={geolocation.countryCode}
              svg
              style={{
                width: '16px',
                height: '16px',
              }}
            />
          )}
          <p className="text-sm text-muted-foreground">
            {geolocation.country || 'Unknown location'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GeoLocation;