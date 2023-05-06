'use client'; // components in next 13 are server components by default, so we need to convert it to client component so we can use state
// https://nextjs.org/docs/getting-started/react-essentials

// hooks
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import { Country, City } from 'country-state-city';
import Select from 'react-select';

// icons
import { GlobeIcon } from '@heroicons/react/solid';

// types
import { ICountry, ICity } from 'country-state-city';
import { CityOption, CountryOption } from '@/types/city-picker.types';

function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption>(null);
  const router = useRouter();

  const handleCountryChange = (option: CountryOption) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleCityChange = (option: CityOption) => {
    setSelectedCity(option);
    router.push(
      `/location/${option?.value.latitude}/${option?.value.longitude}`
    );
  };

  // react select needs the value key, so we need to map the original countries and add value
  const countryOptions = Country.getAllCountries().map((country: ICountry) => ({
    value: {
      latitude: country.latitude,
      longitude: country.longitude,
      isoCode: country.isoCode,
    },
    label: country.name,
  }));

  return (
    <div className="space-y-4">
      <div className="space-y-2" id="country-select">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          name="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          options={countryOptions}
          className="text-black"
        />
      </div>

      {selectedCountry?.value && (
        <div className="space-y-2" id="state-select">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="city">City</label>
          </div>
          <Select
            name="city"
            value={selectedCity}
            onChange={handleCityChange}
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((city: ICity) => ({
              value: {
                latitude: city.latitude!,
                longitude: city.longitude!,
                countryCode: city.countryCode,
                name: city.name,
                stateCode: city.stateCode,
              },
              label: city.name,
            }))}
            className="text-black"
          />
        </div>
      )}
    </div>
  );
}

export default CityPicker;
