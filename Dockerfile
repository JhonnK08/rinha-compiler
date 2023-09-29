FROM "oven/bun"

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY bun.lockb ./
RUN bun install

# Copying source files
COPY src ./src
COPY index.js ./

CMD ["sh", "-c", "bun start && bun script.js"]