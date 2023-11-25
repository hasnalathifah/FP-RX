'use client';

import { Map } from 'lucide-react';
import * as React from 'react';

import ButtonLink from '@/components/links/ButtonLink';
import NextImage from '@/components/NextImage';

export default function HomePage() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <NextImage
            src='/favicon.png'
            width={100}
            height={100}
            alt='Logo'
            className='w-16'
          />
          <h1 className='mt-4'>ITS Campus Navigation</h1>
          <p className='mt-2 text-sm text-gray-800'>
            An Augmented Reality Experience for Navigating in ITS Campus
          </p>

          <div className='mt-6 flex gap-4'>
            <ButtonLink href='/ar' variant='light'>
              Testing AR
            </ButtonLink>
            <ButtonLink href='/map' variant='light' leftIcon={Map}>
              Testing Map
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
