import * as React from 'react';
import { useEffect, useState } from 'react';

type Track = {
  sourceName: string;
  dest: string;
};

function TrackHistory() {
  const [tracks, setTracks] = useState<Track[]>([]);
  useEffect(() => {
    const storedTracks = JSON.parse(localStorage.getItem('paths') || '[]');
    setTracks(storedTracks);
  }, []);

  return (
    <div className="h-full lg:w-1/5 fixed right-0 bg-slate-800 text-gray-100 flex flex-col items-center py-16">
      {/* eslint-disable-next-line operator-linebreak */}
      {tracks.length > 0 &&
        tracks.map((track) => (
          <p key={track[2]}>
            S{track[0]} D{track[1]}
          </p>
        ))}
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
