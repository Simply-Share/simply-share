FROM node:22 AS base
WORKDIR /app
RUN npm install -g nodemon

# Stage: backend-base
FROM base AS backend-dev
COPY ./package.json ./package-lock.json ./
RUN --mount=type=cache,id=npm,target=/usr/local/share/.cache/npm \
    npm install
COPY . .
RUN npx prisma generate
CMD npm run dev

FROM base AS final
ENV NODE_ENV=production
COPY --from=backend-dev /app/package.json /app/package-lock.json ./
RUN --mount=type=cache,id=npm,target=/usr/local/share/.cache/npm \
    npm install
COPY . .
EXPOSE 8000
CMD npm run start