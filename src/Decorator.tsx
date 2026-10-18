import { DecoratorContext } from '@extpoint/storybook-elements';
import type { Decorator } from '@storybook/react';

const decorator: Decorator = (Story, context) => {
  const { lang } = context.globals;

  return (
    <DecoratorContext.Provider value={{ lang }}>
      <div className="storybook-decorator">
        <Story />
      </div>
    </DecoratorContext.Provider>
  );
};

export default decorator;
