import { Loader } from '@googlemaps/js-api-loader';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import clsxm from '@/lib/clsxm';

import Input from '@/components/forms/Input';

import { MAP_API_KEY } from '@/constant/env';
type PlacesAutoCompleteInputProps = {
  id: string;
  onSelect: React.Dispatch<React.SetStateAction<google.maps.Place | undefined>>;
  initialValue: google.maps.Place | undefined;
};

export default function PlacesAutocompleteInput({
  id,
  onSelect,
  initialValue,
}: PlacesAutoCompleteInputProps) {
  const [show, setShow] = React.useState<boolean>(false);
  const [results, setResults] =
    React.useState<Array<google.maps.places.AutocompletePrediction>>();

  const [autocompleteService, setAutocompleteService] =
    React.useState<google.maps.places.AutocompleteService>();

  //#region  //*=========== Form ===========
  const { watch } = useFormContext();
  const search = watch(id);
  //#endregion  //*======== Form ===========

  React.useEffect(() => {
    const initServices = async () => {
      const loader = new Loader({
        apiKey: MAP_API_KEY as string,
        version: 'weekly',
      });
      const { AutocompleteService } = await loader.importLibrary('places');
      const service = new AutocompleteService();
      setAutocompleteService(service);
    };

    initServices();
  }, []);

  React.useEffect(() => {
    const showResult = async () => {
      autocompleteService
        ?.getPlacePredictions({ input: search })
        .then((res) => setResults(res.predictions));
    };

    if (show) showResult();
  }, [autocompleteService, search, show]);

  //#region  //*=========== Show Result ===========
  const shouldShowResult = search?.length >= 3;

  const onInputFocus = () => {
    if (shouldShowResult) setShow(true);
    else return;
  };

  React.useEffect(() => {
    if (shouldShowResult) setShow(true);
    else setShow(false);
  }, [shouldShowResult]);
  //#endregion  //*======== Show Result ===========

  return (
    <div className='relative z-10 w-full'>
      <Input
        id={id}
        label={id}
        onFocus={onInputFocus}
        className='relative w-full'
        hideError
      />
      <Transition
        as={React.Fragment}
        show={show}
        enter='transition ease-out duration-100'
        enterFrom='opacity-0 -translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 -translate-y-1'
      >
        <div
          className={clsx([
            'border-typo-outline absolute inset-x-0 top-[calc(100%+0.5e)] z-10 w-full bg-white shadow-sm',
            'min-h-[4em] overflow-hidden rounded-md border border-gray-300 bg-gray-100 shadow-sm',
          ])}
        >
          {results?.map((result) => (
            <AutocompleteValue
              onSelect={onSelect}
              value={initialValue}
              key={result.place_id}
              data={result}
            />
          ))}
        </div>
      </Transition>
    </div>
  );
}

function AutocompleteValue({
  data,
  onSelect,

  value,
}: {
  data: google.maps.places.AutocompletePrediction;
  onSelect: React.Dispatch<React.SetStateAction<google.maps.Place | undefined>>;

  value: google.maps.Place | undefined;
}) {
  const onSelectValue = () => {
    onSelect({
      placeId: data.place_id,
    });
  };
  return (
    <div
      className={clsxm([
        'cursor-pointer px-3 py-2 ',
        data.place_id === value?.placeId
          ? 'bg-primary-100'
          : 'hover:bg-gray-100',
      ])}
      onClick={() => onSelectValue()}
    >
      <p>{data.structured_formatting.main_text}</p>
      <p className='text-sm text-gray-600'>
        {data.structured_formatting.secondary_text}
      </p>
    </div>
  );
}
