FROM node:18-alpine as build

WORKDIR /tmp/sveltekit
COPY package*.json .
COPY src src
COPY static static
COPY svelte.config.js .
COPY vite.config.js .

RUN npm install
RUN npm run build

FROM node:18-alpine as run
WORKDIR /app
COPY --from=build /tmp/sveltekit/package.json .
COPY --from=build /tmp/sveltekit/build build
COPY --from=build /tmp/sveltekit/node_modules node_modules
EXPOSE 3000
ENTRYPOINT node build/index.js
