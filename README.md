# @extpoint/storybook-elements

Shared Storybook components.

Call `initializeStorybook()` in the host's Storybook preview before stories render.
Import `@extpoint/storybook-elements/StorybookDecorator.css` for the component styles.

The package provides ESM JavaScript, TypeScript declarations, and a separate stylesheet.
The host supplies React 18, React DOM 18, and Storybook React 8 through peer dependencies.

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

Update the version in `package.json` and commit the release changes, then inspect
the release without uploading it:

```sh
pnpm publish --dry-run
```

Sign in to npm with an account that can publish under `@extpoint`, then publish:

```sh
npm login
pnpm publish
```

Packing or publishing automatically runs type checking, linting, and a fresh build.
The public package contains `dist`, `README.md`, `LICENSE`, and `package.json`.

## License

MIT — see [LICENSE](./LICENSE).
