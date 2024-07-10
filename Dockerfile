FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .

RUN bunx prisma migrate dev --name init

EXPOSE 3000

CMD ["bun", "index.ts"]
