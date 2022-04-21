import getDistanceFromLatLonInKm from 'lib/cordinatesToDistance';
import * as React from 'react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Destination, Source } from 'types/types';

const HERE_KEY = process.env.REACT_APP_HERE_KEY;

const geoFetch = async (country: string, city: string, alley: string) => {
  const res = await fetch(
    `https://geocode.search.hereapi.com/v1/geocode?q=${country}+${city}+${alley}&apiKey=${HERE_KEY}`,
  );

  if (!res.ok) return null;
  const data = await res.json();

  return data;
};

type FormValues = {
  sourceCountry: string;
  sourceCity: string;
  sourceAlley: string;
  destCountry: string;
  destCity: string;
  destAlley: string;
};

type FormProps = {
  source: Source;
  setSource: Dispatch<SetStateAction<Source>>;
  destination: Destination;
  setDestination: Dispatch<SetStateAction<Destination>>;
  setDistanceInKm: Dispatch<SetStateAction<number>>;
};

function Form({
  source,
  setSource,
  destination,
  setDestination,
  setDistanceInKm,
}: FormProps) {
  const { reset, handleSubmit, register } = useForm<FormValues>();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onError = (err, e) => reset(e);
  const onSubmit: SubmitHandler<FormValues> = async (data, e) => {
    const { sourceCountry, sourceCity, destCountry, destCity } = data;

    let { sourceAlley, destAlley } = data;

    // The API params accept multiline strings separated by +
    if (sourceAlley.split(' ').length > 1) {
      sourceAlley = sourceAlley.split(' ').join('+');
    }

    if (destAlley.split(' ').length > 1) {
      destAlley = destAlley.split(' ').join('+');
    }

    const sourceRes = await geoFetch(sourceCountry, sourceCity, sourceAlley);
    const destRes = await geoFetch(destCountry, destCity, destAlley);

    if (!sourceRes.items.length || !destRes.items.length) {
      return setError('We couldnt find that place');
    }

    const sourceCoordinates: number[] = Object.values(
      sourceRes.items[0].position,
    );
    const destCoordinates: number[] = Object.values(destRes.items[0].position);

    setSource((prevSource) => ({
      ...prevSource,
      coordinates: sourceCoordinates,
      name: sourceRes.items[0].address.label,
    }));

    setDestination((prevDest) => ({
      ...prevDest,
      coordinates: destCoordinates,
      name: destRes.items[0].address.label,
    }));

    setDistanceInKm(
      Math.round(getDistanceFromLatLonInKm(sourceCoordinates, destCoordinates)),
    );

    navigate('/map');
    return reset();
  };

  return (
    <div className="h-screen grid place-items-center">
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <main className="flex gap-16">
          <section className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl text-center">
              Starting point
            </h2>
            <label htmlFor="sourceCountry">Country</label>
            <input
              {...register('sourceCountry')}
              className="border border-black"
              name="sourceCountry"
            />
            <label htmlFor="sourceCity">City</label>
            <input
              {...register('sourceCity')}
              required
              className="border border-black"
              name="sourceCity"
            />
            <label htmlFor="sourceAlley">Alley</label>
            <input
              {...register('sourceAlley')}
              className="border border-black"
              name="sourceAlley"
            />
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl text-center">Destination</h2>
            <label htmlFor="country">Country</label>
            <input
              {...register('destCountry')}
              className="border border-black"
              name="destCountry"
            />
            <label htmlFor="city">City</label>
            <input
              {...register('destCity')}
              required
              className="border border-black"
              name="destCity"
            />
            <label htmlFor="alley">Alley</label>
            <input
              {...register('destAlley')}
              className="border border-black"
              name="destAlley"
            />
          </section>
        </main>

        <input
          className="px-6 py-2 w-32 mx-auto mt-8 rounded-lg bg-blue-600 text-gray-100"
          type="submit"
          value="Search"
        />
      </form>
    </div>
  );
}

export default Form;
