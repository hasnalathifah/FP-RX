import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Form',
};

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
