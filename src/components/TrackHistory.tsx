import * as React from 'react';
import { useEffect, useState } from 'react';
import Track from './Track';

type TrackT = {
  sourceName: string;
  dest: string;
};

function TrackHistory() {
  const [tracks, setTracks] = useState<TrackT[]>([]);
  useEffect(() => {
    const storedTracks = JSON.parse(localStorage.getItem('paths') || '[]');
    setTracks(storedTracks);
  }, []);

  return (
    <div className="h-full lg:w-1/5 fixed right-0 bg-slate-800 text-gray-100 flex flex-col justify-between px-8 items-center py-16">
      <h2 className="text-xl font-semibold">Your track history</h2>
      <section className="flex flex-col gap-2">
        {/* eslint-disable-next-line operator-linebreak */}
        {tracks.length > 0 &&
          tracks.map((track) => <Track sourceName={track[0]} destName={track[1]} key={track[2]} />)}
      </section>
      <button
        className="bg-red-500 px-4 py-2 rounded-md mx-auto"
        type="button"
        onClick={() => {
          localStorage.removeItem('paths');
          setTracks([]);
        }}
      >
        Clear your path history
      </button>
    </div>
  );
}

export default TrackHistory;
