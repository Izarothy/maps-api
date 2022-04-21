const HERE_KEY = process.env.REACT_APP_HERE_KEY;

const geoFetch = async (country: string, city: string, alley: string) => {
  const res = await fetch(
    `https://geocode.search.hereapi.com/v1/geocode?q=${country}+${city}+${alley}&apiKey=${HERE_KEY}`,
  );

  if (!res.ok) return null;
  const data = await res.json();

  return data;
};

export default geoFetch;
