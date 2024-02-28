# Wedding photos

Webapp that allows my wedding party guests to upload their photos and movies.

Built with Sveltekit.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building without Docker

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Building with Docker
The Docker build will 
* npm install all dependencies
* run the npm build
* package the result in a Docker image

Run `docker build . --no-cache --tag wedding-photo:0.0.1`

## Running in Docker
Provide the following env variables:
* `-e ORIGIN=http://localhost:3000`
* `-e BODY_SIZE_LIMIT=1000000000`
* `-e UPLOAD_FOLDER=/upload`

Mount a volume to get access to the uploads: `-v /Users/stijnhooft/app/wedding-photos:/upload`

Open port `3000` to access the front-end.


