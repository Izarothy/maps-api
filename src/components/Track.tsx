import * as React from 'react';
import Collapsible from 'react-collapsible';

type TrackProps = {
  sourceName: string;
  destName: string;
};
function Track({ sourceName, destName }: TrackProps) {
  const sourceCity = sourceName.split(',')[0];
  const destCity = destName.split(',')[0];

  return (
    <article className="bg-blue-500 py-3 rounded-sm text-gray-100 px-4">
      <Collapsible trigger={`From ${sourceCity} to ${destCity}`}>
        <p>
          <span className="font-bold text-gray-800">Source:</span> {sourceName}
        </p>
        <p>
          <span className="font-bold text-gray-800">Destination:</span> {sourceName}
        </p>
      </Collapsible>
    </article>
  );
}

export default Track;
