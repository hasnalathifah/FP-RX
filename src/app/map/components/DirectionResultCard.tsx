import { Loader } from '@googlemaps/js-api-loader';
import * as React from 'react';

import { MAP_API_KEY } from '@/constant/env';

type DirectionResultCardProps = {
  origin?: google.maps.Place;
  destination?: google.maps.Place;
};
export default function DirectionResultCard({
  origin,
  destination,
}: DirectionResultCardProps) {
  const [directionService, setDirectionService] =
    React.useState<google.maps.DirectionsService>();

  const [directionsRenderer, setDirectionsRenderer] =
    React.useState<google.maps.DirectionsRenderer>();

  const [travelMode, setTravelMode] =
    React.useState<google.maps.TravelMode.WALKING>();

  const [result, setResult] = React.useState<google.maps.DirectionsResult>();
  const mapRef = React.useRef<HTMLDivElement>(null);

  // inti direction services
  React.useEffect(() => {
    const initServices = async () => {
      const loader = new Loader({
        apiKey: MAP_API_KEY as string,
        version: 'weekly',
      });
      const { DirectionsService, TravelMode } = await loader.importLibrary(
        'routes'
      );
      const service = new DirectionsService();
      setDirectionService(service);

      const travelMode = TravelMode.WALKING;
      setTravelMode(travelMode);
    };

    initServices();
  }, []);

  //#region  //*=========== Init Map ===========
  React.useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: MAP_API_KEY as string,
        version: 'weekly',
      });

      const { Map } = await loader.importLibrary('maps');
      const { DirectionsRenderer } = await loader.importLibrary('routes');

      const position = {
        lat: -7.289976731348357,
        lng: 112.80254963465573,
      };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: '227936313c4893df',
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      const renderer = new DirectionsRenderer();

      renderer.setMap(map);
      setDirectionsRenderer(renderer);
    };

    initMap();
  }, []);
  //#endregion  //*======== Init Map ===========

  // calculate route
  React.useEffect(() => {
    if (origin && destination && travelMode) {
      directionService
        ?.route({
          destination: {
            placeId: destination.placeId,
          },
          origin: {
            placeId: origin.placeId,
          },
          travelMode: travelMode,
        })
        .then((res) => {
          directionsRenderer?.setDirections(res);
          setResult(res);
        });
    }
  }, [origin, destination, travelMode, directionService, directionsRenderer]);
  return (
    <div>
      <pre>{JSON.stringify(result, null, 2)}</pre>
      <div className='mt-4 h-[50vh] overflow-hidden rounded-xl' ref={mapRef} />
    </div>
  );
}
