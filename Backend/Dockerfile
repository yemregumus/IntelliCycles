FROM node:20.10.0 AS dependencies

WORKDIR /backend

COPY package* ./

RUN npm install

FROM node:20.10.0 AS development

WORKDIR /backend

COPY --from=dependencies /backend /backend

COPY ./src ./src

FROM node:20.10.0

ENV PORT=8080

WORKDIR /backend

COPY --from=development /backend /backend

CMD [ "node", "src/server.js" ]

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
 CMD curl --fail localhost:${PORT} || exit 1