# Map Routing Website

Live version hosted on [Vercel](https://maps-api-three.vercel.app/).

It uses the [HERE Maps API](https://developer.here.com/products/geocoding-and-search) to display a path between any two points on Earth, using the react-leaflet and Leaflet packages.
It then "arbitrarily" calculates the distance in a straight line and makes calculations based on it, such as:

- Total trip cost
- How long it'll take to get there assuming you make 800km per day
- The trip cost per day, based on how much the user spends per km

All this data is available for download in a PDF format.

Past searches are stored in the user's browser and seen on the homepage.

# Tech stack:

- React
- React Router
- TailwindCSS
- Jest
- React Testing Library
