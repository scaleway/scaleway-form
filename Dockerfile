######################################################################
# This stage install dependencies and build the application          #
######################################################################
FROM node:18.12-alpine as builder
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable
RUN pnpm install --frozen-lockfile

COPY src ./src
COPY .storybook ./.storybook

RUN pnpm run build:storybook

######################################################################
# This stage download a simple http server and serve the application #
######################################################################
FROM joseluisq/static-web-server:2

WORKDIR /workspace

COPY --from=builder /usr/src/app/storybook-static ./public

