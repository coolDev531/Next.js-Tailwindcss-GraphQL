import { ICity, ICountry, IState } from 'country-state-city';

export type CountryOption = {
  value: {
    latitude: ICountry['latitude'];
    longitude: ICountry['longitude'];
    isoCode: ICountry['isoCode'];
  };
  label: ICountry['name'];
} | null;

export type CityOption = {
  value: {
    latitude: ICity['latitude'];
    longitude: ICity['longitude'];
    name: ICity['name'];
    stateCode: ICity['stateCode'];
    countryCode: ICity['countryCode'];
  };
  label: ICity['name'];
} | null;

export type StateOption = {
  value: {
    latitude: ICity['latitude'];
    longitude: ICity['longitude'];
    name: ICity['name'];
    isoCode: IState['isoCode'];
    countryCode: ICity['countryCode'];
  };
  label: ICity['name'];
} | null;
