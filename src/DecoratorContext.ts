import React from 'react';

import type { Lang } from './bridge';
import { getStorybookConfiguration } from './bridge';

export const DecoratorContext = React.createContext<{
  lang: Lang;
}>({
  // Read the configured fallback after the preview has initialized
  get lang() {
    return getStorybookConfiguration().defaultLang;
  },
});
