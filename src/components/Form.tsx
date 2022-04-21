import getDistanceFromLatLonInKm from 'lib/cordinatesToDistance';
import geoFetch from 'lib/geoFetch';
import pushToLocalStorage from 'lib/pushToLocalStorage';
import * as React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Destination, Source } from 'types/types';
import TrackHistory from './TrackHistory';

// @ts-ignore - this gets imported normally
import mapImage from '../assets/map.jpg';

type FormValues = {
  sourceCountry: string;
  sourceCity: string;
  sourceAlley: string;
  destCountry: string;
  destCity: string;
  destAlley: string;
};

type FormProps = {
  setSource: Dispatch<SetStateAction<Source>>;
  setDestination: Dispatch<SetStateAction<Destination>>;
  setDistanceInKm: Dispatch<SetStateAction<number>>;
};

function Form({ setSource, setDestination, setDistanceInKm }: FormProps) {
  const { reset, handleSubmit, register } = useForm<FormValues>();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [mobileHistoryOpen, setMobileHistoryOpen] = useState(false);

  const onError = () => reset();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
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
      reset();
      return setError('We couldnt find that place');
    }

    const sourceCoordinates: number[] = Object.values(sourceRes.items[0].position);
    const sourceName = sourceRes.items[0].address.label;
    const destCoordinates: number[] = Object.values(destRes.items[0].position);
    const destName = destRes.items[0].address.label;

    setSource((prevSource) => ({
      ...prevSource,
      coordinates: sourceCoordinates,
      name: sourceName,
    }));

    setDestination((prevDest) => ({
      ...prevDest,
      coordinates: destCoordinates,
      name: destName,
    }));

    setDistanceInKm(Math.round(getDistanceFromLatLonInKm(sourceCoordinates, destCoordinates)));

    pushToLocalStorage(sourceName, destName);

    setError('');
    navigate('/map');
    return reset();
  };

  return (
    <div
      style={{ backgroundImage: `url(${mapImage})` }}
      className="min-h-screen pb-8 flex flex-col bg-cover bg-center items-center justify-center bg-gray-200"
    >
      <h1 className="top-16 my-10 font-bold text-2xl lg:text-3xl text-gray-100">Map Routing</h1>
      <h2 className="text-red-500 font-semibold text-lg">{error}</h2>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <form role="form" className="flex flex-col bg-white/90 p-8 rounded-sm md:w-1/2 max-w-xl" onSubmit={handleSubmit(onSubmit, onError)}>
        <main className="flex flex-col lg:flex-row gap-16 justify-center">
          <section className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl text-center">Starting point</h2>
            <label htmlFor="sourceCountry">Country</label>
            <input {...register('sourceCountry')} className="pathInput" name="sourceCountry" />
            <label htmlFor="sourceCity">City</label>
            <input {...register('sourceCity')} required className="pathInput" name="sourceCity" />
            <label htmlFor="sourceAlley">Alley</label>
            <input {...register('sourceAlley')} className="pathInput" name="sourceAlley" />
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl text-center">Destination</h2>
            <label htmlFor="country">Country</label>
            <input {...register('destCountry')} className="pathInput" name="destCountry" />
            <label htmlFor="city">City</label>
            <input {...register('destCity')} required className="pathInput" name="destCity" />
            <label htmlFor="alley">Alley</label>
            <input {...register('destAlley')} className="pathInput" name="destAlley" />
          </section>
        </main>

        <input className="px-6 py-2 w-32 mx-auto mt-8 rounded-lg bg-blue-600 text-gray-100 cursor-pointer" type="submit" value="Search" />
      </form>
      <TrackHistory mobileHistoryOpen={mobileHistoryOpen} setMobileHistoryOpen={setMobileHistoryOpen} />
      {!mobileHistoryOpen && (
        <button className="absolute lg:hidden top-4 right-4 text-white font-bold" type="button" onClick={() => setMobileHistoryOpen(true)}>
          Open history
        </button>
      )}
    </div>
  );
}

export default Form;
