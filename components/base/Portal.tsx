import React from 'react';
import { createPortal } from 'react-dom';

export function Portal({ children }: React.PropsWithChildren<{}>) {
  return typeof window === 'undefined'
    ? null
    : createPortal(children, document.getElementById('🦄️'));
}
