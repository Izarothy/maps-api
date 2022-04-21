export const pushToLocalStorage = (sourceName: string, destName: string) => {
  const savedTracks = JSON.parse(localStorage.getItem('paths'));

  if (savedTracks) {
    localStorage.setItem(
      'paths',
      JSON.stringify([...savedTracks, [sourceName, destName]]),
    );
  } else {
    localStorage.setItem('paths', JSON.stringify([[sourceName, destName]]));
  }
};

export default pushToLocalStorage;
