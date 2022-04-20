import * as React from 'react';
import { useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

function TrackCostForm() {
  const { reset, handleSubmit, register } = useForm();
  const [price, setPrice] = useState<number>(0);
  const onSubmit = (data, e) => {
    setPrice(data.kmPrice);
    reset();
  };
  const onError = (err, e) => console.log(err);
  return (
    <form
      className="text-gray-100 fixed right-0 top-0 px-4 py-8 w-1/6 bg-slate-800 h-full border flex flex-col"
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
        <h2>calculations here</h2>
      </div>
    </form>
  );
}

export default TrackCostForm;
