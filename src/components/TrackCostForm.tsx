import * as React from 'react';
import { useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Destination, Source } from 'types/types';

type FormProps = {
  kmPrice: number;
};

type TrackCostFormProps = {
  destination: Destination;
  source: Source;
};

function TrackCostForm({ destination, source }: TrackCostFormProps) {
  const { reset, handleSubmit, register } = useForm();
  const [price, setPrice] = useState<number>(0);

  const onSubmit: SubmitHandler<FormProps> = (data, e) => {
    // data.kmPrice;
    reset();
  };
  const onError = (err, e) => console.log(err);

  return (
    <form
      className="text-gray-100 fixed right-0 top-0 px-4 py-8 w-1/6 bg-slate-800 h-full border flex flex-col z-[999]"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <Link to="/">
        <p className=" mb-12 text-lg font-semibold hover:text-blue-400">
          Homepage
        </p>
      </Link>
      <label className=" font-semibold" htmlFor="kmPrice ">
        Price per km (in PLN)
      </label>
      <input
        type="number"
        className="rounded-sm p-2 text-black"
        required
        name="kmPrice"
        {...register('kmPrice')}
      />
      <input
        type="submit"
        value="Oblicz"
        className=" px-4 py-2 rounded-md bg-blue-500 mt-16 cursor-pointer w-2/3 mx-auto"
      />
      <div className="flex flex-col text-center mt-8">
        <span className="flex justify-between">
          <h3>From {source.name}</h3>
          <h3>To {destination.name}</h3>
        </span>
      </div>
    </form>
  );
}

export default TrackCostForm;
