'use client'; // components in next 13 are server components by default, so we need to convert it to client component so we can use state
// https://nextjs.org/docs/getting-started/react-essentials

// hooks
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import { Country, City, State } from 'country-state-city';
import Select from 'react-select';
import { Button } from '@tremor/react';

// icons
import { GlobeIcon } from '@heroicons/react/solid';

// types
import { ICountry, ICity, IState } from 'country-state-city';
import { CityOption, CountryOption, StateOption } from '@/types/city-picker';

function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption>(null);
  const [selectedState, setSelectedState] = useState<StateOption>(null);

  const router = useRouter();

  const countryCode = useMemo(
    () => selectedCountry?.value.isoCode || '',
    [selectedCountry]
  );
  const stateCode = useMemo(
    () => selectedState?.value.isoCode || '',
    [selectedState]
  );

  // react select needs the value key, so we need to map the original countries and add value
  const countryOptions = Country.getAllCountries().map((country: ICountry) => ({
    value: {
      latitude: country.latitude,
      longitude: country.longitude,
      isoCode: country.isoCode,
    },
    label: country.name,
  }));

  const stateOptions = State.getStatesOfCountry(countryCode).map(
    (state: IState) => ({
      value: {
        latitude: state.latitude!,
        longitude: state.longitude!,
        countryCode: state.countryCode,
        name: state.name,
        isoCode: state.isoCode,
      },
      label: state.name,
    })
  );

  const cityOptions = City.getCitiesOfState(countryCode, stateCode).map(
    (city: ICity) => ({
      value: {
        latitude: city.latitude!,
        longitude: city.longitude!,
        countryCode: city.countryCode,
        name: city.name,
        stateCode: city.stateCode,
      },
      label: city.name,
    })
  );

  const handleCountryChange = (option: CountryOption) => {
    setSelectedCountry(option);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (option: StateOption) => {
    setSelectedCity(null);
    setSelectedState(option);
  };

  const handleCityChange = (option: CityOption) => {
    setSelectedCity(option);
  };

  const goToWeatherPage = () => {
    if (!selectedCountry?.value) return;

    const option = selectedCity?.value || selectedState?.value;

    router.push(
      `/location/${option?.name}/${option?.latitude}/${option?.longitude}`
    );
  };

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
        <>
          {stateOptions.length > 0 ? (
            <div className="space-y-2" id="state-select">
              <div className="flex items-center space-x-2 text-white/80">
                <GlobeIcon className="h-5 w-5 text-white" />
                <label htmlFor="city">State</label>
              </div>
              <Select
                name="city"
                value={selectedState}
                onChange={handleStateChange}
                options={stateOptions}
                className="text-black"
              />
            </div>
          ) : null}

          {cityOptions.length > 0 ? (
            <div className="space-y-2" id="city-select">
              <div className="flex items-center space-x-2 text-white/80">
                <GlobeIcon className="h-5 w-5 text-white" />
                <label htmlFor="city">City</label>
              </div>
              <Select
                name="city"
                value={selectedCity}
                onChange={handleCityChange}
                options={cityOptions}
                className="text-black"
              />
            </div>
          ) : null}
        </>
      )}

      <Button
        className="w-full text-white bg-gradient-to-br from-[#f961e4] to-[#4063F2]"
        onClick={goToWeatherPage}
        disabled={
          cityOptions.length > 0 ? !selectedCity?.value : !selectedState?.value
        }>
        {`Get Weather Report ${selectedCountry?.label ? 'for' : ''} ${
          (selectedCity?.label || selectedState?.label || selectedCountry?.label)
        ?? '' }`}
      </Button>
    </div>
  );
}

export default CityPicker;
