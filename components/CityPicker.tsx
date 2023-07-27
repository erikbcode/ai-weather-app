'use client';

import { useState } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { useRouter } from 'next/navigation';
import { GlobeIcon } from '@heroicons/react/solid';

type CountryOption = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type StateOption = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
    countryCode: string;
  };
  label: string;
} | null;

type CityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

const CountryOptions = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption>(null);
  const [selectedState, setSelectedState] = useState<StateOption>(null);
  const router = useRouter();

  const handleSelectedCountry = (selection: CountryOption) => {
    setSelectedCountry(selection);
    setSelectedCity(null);
  };

  const handleSelectedState = (selection: StateOption) => {
    setSelectedState(selection);
    setSelectedCity(null);
  };

  const handleSelectedCity = (selection: CityOption) => {
    setSelectedCity(selection);
    router.push(
      `/location/${selectedCountry?.label.replace(' ', '')}/${
        selection?.value.name
      }/${selection?.value.latitude}/${selection?.value.longitude}`
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          instanceId="selectCountry"
          className="text-black"
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={CountryOptions}
        />
      </div>

      {selectedCountry && selectedCountry.label === 'United States' && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="state">State</label>
          </div>
          <Select
            instanceId="selectState"
            className="text-black"
            value={selectedState}
            onChange={handleSelectedState}
            options={State.getStatesOfCountry(
              selectedCountry.value.isoCode
            )?.map((state) => ({
              value: {
                latitude: state.latitude!,
                longitude: state.longitude!,
                isoCode: state.isoCode,
                countryCode: state.countryCode,
              },
              label: state.name,
            }))}
          />

          {selectedState && (
            <div>
              <div className="flex items-center space-x-2 text-white">
                <GlobeIcon className="h-5 w-5 text-white" />
                <label htmlFor="city">City</label>
              </div>
              <Select
                instanceId="selectCity"
                className="text-black"
                value={selectedCity}
                onChange={handleSelectedCity}
                options={City.getCitiesOfState(
                  selectedState.value.countryCode,
                  selectedState.value.isoCode
                )?.map((city) => ({
                  value: {
                    latitude: city.latitude!,
                    longitude: city.longitude!,
                    countryCode: city.countryCode,
                    name: city.name,
                    stateCode: city.stateCode,
                  },
                  label: city.name,
                }))}
              />
            </div>
          )}
        </div>
      )}

      {selectedCountry && selectedCountry.label !== 'United States' && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="city">City</label>
          </div>
          <Select
            className="text-black"
            value={selectedCity}
            onChange={handleSelectedCity}
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((city) => ({
              value: {
                latitude: city.latitude!,
                longitude: city.longitude!,
                countryCode: city.countryCode,
                name: city.name,
                stateCode: city.stateCode,
              },
              label: city.name,
            }))}
          />
        </div>
      )}
    </div>
  );
}

export default CityPicker;
