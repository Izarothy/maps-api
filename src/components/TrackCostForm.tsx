import * as React from 'react';
import { useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Destination, Source } from 'types/types';

import JsPDF from 'jspdf';
import { report } from 'process';
import generatePDF from 'lib/generatePDF';

type FormProps = {
  kmPrice: number;
};

type TrackCostFormProps = {
  destination: Destination;
  source: Source;
  distanceInKm: number;
};

function TrackCostForm({ destination, source, distanceInKm }: TrackCostFormProps) {
  const { reset, handleSubmit, register } = useForm();
  const [price, setPrice] = useState<number>(0);
  const [dailyPrice, setDailyPrice] = useState<number>(0);
  const [sumDays, setSumDays] = useState<number>(0);

  const onSubmit: SubmitHandler<FormProps> = (data, e) => {
    setPrice(Math.round(data.kmPrice * distanceInKm * 1.1));
    setDailyPrice(Math.round(data.kmPrice * 800 * 1.1));
    setSumDays(Math.ceil(distanceInKm / 800));
    reset();
  };
  const onError = (err, e) => console.log(err);

  return (
    <form
      className="text-gray-100 fixed right-0 top-0 px-4 py-8 w-1/6 bg-slate-800 h-full flex flex-col z-[999]"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <Link to="/">
        <p className=" mb-12 text-lg font-semibold hover:text-blue-400">Homepage</p>
      </Link>
      <label className=" font-semibold" htmlFor="kmPrice ">
        Price per km (in PLN)
      </label>
      <input type="number" step="0.01" className="rounded-sm p-2 text-black" required name="kmPrice" {...register('kmPrice')} />
      <input type="submit" value="Calculate" className=" px-4 py-2 rounded-md bg-blue-500 mt-16 cursor-pointer w-2/3 mx-auto" />
      <div id="pdf" className="flex flex-col text-center mt-8 gap-4">
        <span className="flex flex-col text-left justify-between gap-2">
          <h3 className="font-semibold">From {source.name}</h3>
          <h3 className="font-semibold">To {destination.name}</h3>
        </span>
        <p className="text-left">Distance in km: {distanceInKm}</p>
        {price > 0 && (
          <section className="text-left flex flex-col gap-2">
            <p>Total cost: {price}PLN</p>
            <p>Price per day: {dailyPrice}PLN</p>
            <p>You will need {sumDays} days in total</p>
          </section>
        )}
      </div>
      {price > 0 && (
        <button
          type="button"
          onClick={() => generatePDF(source.name, destination.name, distanceInKm, price, dailyPrice, sumDays)}
          className="px-4 py-2 rounded-md bg-blue-500 mt-12"
        >
          Export as PDF
        </button>
      )}
    </form>
  );
}

export default TrackCostForm;
