import * as React from 'react';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import Track from './Track';

type TrackT = {
  sourceName: string;
  dest: string;
};

type TrackHistoryProps = {
  mobileHistoryOpen: boolean;
  setMobileHistoryOpen: Dispatch<SetStateAction<boolean>>;
};

function TrackHistory({ mobileHistoryOpen, setMobileHistoryOpen }: TrackHistoryProps) {
  const [tracks, setTracks] = useState<TrackT[]>([]);
  useEffect(() => {
    const storedTracks = JSON.parse(localStorage.getItem('paths') || '[]');
    setTracks(storedTracks);
  }, []);

  return (
    <div
      className={`${
        mobileHistoryOpen ? 'fixed' : 'hidden fixed lg:block'
      } h-full lg:w-1/5 lg:right-0 bg-slate-800 text-gray-100 flex flex-col justify-between px-4 lg:px-8 items-center py-16`}
    >
      <button className="absolute top-4 right-4 text-white" type="button" onClick={() => setMobileHistoryOpen(false)}>
        X
      </button>
      <h2 className="text-xl font-semibold">Your track history</h2>
      <section className="flex flex-col gap-2">
        {/* eslint-disable-next-line operator-linebreak */}
        {tracks.length > 0 && tracks.map((track) => <Track sourceName={track[0]} destName={track[1]} key={track[2]} />)}
      </section>
      <span className="flex justify-center py-8">
        <button
          className="bg-red-500 px-4 py-2 rounded-md bottom-4"
          type="button"
          onClick={() => {
            localStorage.removeItem('paths');
            setTracks([]);
          }}
        >
          Clear your path history
        </button>
      </span>
    </div>
  );
}

export default TrackHistory;
