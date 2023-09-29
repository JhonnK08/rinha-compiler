# Rinha compiler

Project made for [rinha-compiler](https://github.com/aripiprazole/rinha-de-compiler) using Javascript and Bun.

## How to install the repository

You must have installed:

-   Bun [(link for install)](https://bun.sh/docs/installation).

After, you need to run `bun install` to install the packages.

## Run the repository

You need to add a rinha JSON file in the `var/rinha` directory as `source.rinha.json` filename.

After that, execute `bun run start` to generate the script. Execute `bun script.js` to run the generated code.

## Run in docker

-   Build the image with `docker build -t jhonn/rinha .`
-   Run the project with `docker run --mount type=bind,source=./var/rinha/source.rinha.json,target=/app/var/rinha/source.rinha.json --memory=2gb --cpus=2 jhonn/rinha`
