# @extpoint/storybook-elements

The setup to use Storybook our way.

[Source](https://github.com/pavel-koryagin/oss.storybook-elements) ·
[Issues](https://github.com/pavel-koryagin/oss.storybook-elements/issues) ·
[npm](https://www.npmjs.com/package/@extpoint/storybook-elements)

## Installation

```sh
pnpm add -D @extpoint/storybook-elements
```

Call `initializeStorybook()` in the host's Storybook preview before stories render.
Import `@extpoint/storybook-elements/StorybookDecorator.css` for the component styles.

The package provides ESM JavaScript, TypeScript declarations, and a separate stylesheet.
The host supplies matching React and React DOM versions (18 or 19), matching React types, and Storybook React 8 through peer dependencies.

## Development

Use Node.js 24.11+ on the 24.x line, or Node.js 26+, and pnpm 12.6.0.

```sh
pnpm install
pnpm check-types
pnpm lint
pnpm build
```

The build writes JavaScript, declarations, and CSS to `dist`.

## Publishing

```sh
npm login
pnpm run publish:all
```

## License

MIT — see [LICENSE](./LICENSE).
