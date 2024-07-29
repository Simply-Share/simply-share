FROM node:20 AS base
WORKDIR /app

# Stage: client-base
FROM base AS client-base
COPY package.json package-lock.json ./
RUN --mount=type=cache,id=npm,target=/usr/local/share/.cache/npm \
    npm install
COPY . .

# Stage: client-dev
FROM client-base AS client-dev
CMD ["npm", "run", "dev"]

# Stage: client-build
FROM client-base AS client-build
RUN npm run build

# Stage: final
FROM base AS final
ENV NODE_ENV=production
COPY --from=client-build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=client-build /app/node_modules ./node_modules
COPY --from=client-build /app/package.json ./package.json
COPY --from=client-build /app/public ./public

EXPOSE 3000
CMD npm run start

