import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Testing AR',
};

export default function ARLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
