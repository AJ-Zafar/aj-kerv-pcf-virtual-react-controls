'use client';

import { useEffect } from 'react';
import { initAll } from 'govuk-frontend';

export function GovInit() {
  useEffect(() => {
    initAll();
  }, []);

  return null;
}
