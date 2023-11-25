import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import DirectionResultCard from '@/app/map/components/DirectionResultCard';
import PlacesAutocompleteInput from '@/app/map/components/PlacesAutocompleteInput';

type QueryForm = {
  origin: string;
  destination: string;
};

export default function Map() {
  const [origin, setOrigin] = React.useState<google.maps.Place>();
  const [destination, setDestination] = React.useState<google.maps.Place>();

  //#region  //*=========== Form ===========
  const methods = useForm<QueryForm>({
    mode: 'onChange',
  });

  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  const onSubmit = async (data: QueryForm) => {
    const body = {
      image: data,
    };
    logger({ body });

    return;
  };
  return (
    <div className='py-16'>
      <DirectionResultCard origin={origin} destination={destination} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
          <div className='grid grid-cols-2 gap-4'>
            <PlacesAutocompleteInput
              id='origin'
              onSelect={setOrigin}
              initialValue={origin}
            />
            <PlacesAutocompleteInput
              id='destination'
              onSelect={setDestination}
              initialValue={destination}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
