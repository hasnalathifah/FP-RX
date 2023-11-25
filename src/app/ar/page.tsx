'use client';

import Script from 'next/script';
import * as React from 'react';

import ARComponent from '../ar/components/ARComponent';

export default function ARPage() {
  return (
    <>
      <Script src="https://aframe.io/releases/1.3.0/aframe.min.js"></Script>
      <Script type="text/javascript" src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js"></Script>
      <Script type="text/javascript" src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></Script>
      <ARComponent />
    </>
    
  );
};


