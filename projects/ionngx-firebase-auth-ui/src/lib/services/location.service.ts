import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IpLookup {
  ip: string;
}

interface LocationLookup {
  location: {
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone: string;
  };
}

@Injectable()
export class LocationService {
  constructor(private httpClient: HttpClient) {}

  public async getCountryCode(): Promise<string> {
    const apiKey = 'at_36FaAAWTH3FflZM34psAvddZB0t3V';
    const ipLookup = await this.httpClient.get<IpLookup>('https://api.ipify.org/?format=json').toPromise();
    const locationLookup = await this.httpClient.get<LocationLookup>(
      `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipLookup.ip}`
    ).toPromise();

    return Promise.resolve(locationLookup.location.country);
  }
}
