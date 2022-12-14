# advent-of-sveltekit-2022

The [Advent of Vue](https://adventofvue.com/) challenges, but in [SvelteKit](https://kit.svelte.dev).

- `npm run dev` - start SvelteKit dev server
- `npm run typesafe-i18n` - run typesafe-i18n generator (transforms locale dictionaries for Day 8)

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
