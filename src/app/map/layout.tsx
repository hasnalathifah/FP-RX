import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Map',
  description: 'Testing Map using Google Map',
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
