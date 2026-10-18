import type { ComponentType, Context, ReactNode } from 'react';

// TODO: Revise do we need this type in bridge.ts
export type Lang = string;

type StorybookConfiguration = {
  defaultLang: Lang;
  BodyContainerContext: Context<HTMLElement | undefined>;
  SlotDecorator: ComponentType<{ children: ReactNode }>;
};

let configuration: StorybookConfiguration;

// Connect shared Storybook components to the host project's values
export function initializeStorybook(values: StorybookConfiguration) {
  configuration = Object.freeze(values);
}

// Read the host configuration after preview initialization
export function getStorybookConfiguration(): StorybookConfiguration {
  return configuration;
}
