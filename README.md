# Welcome to Invoice Manager

- [Remix Docs](https://remix.run/docs)

## Table of contents

- [Welcome to Invoice Manager](#welcome-to-invoice-manager)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [Screenshot](#screenshot)
    - [Links](#links)
    - [Development](#development)
    - [Deployment](#deployment)
    - [Do It Yourself](#do-it-yourself)

## Overview

### Screenshot

![Invoice Screenshots](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

### Development

From your **terminal**:

Clone the repository

```sh
git clone git@github.com:princemuel/invoicemanager.git
# OR clone without git history
npx degit princemuel/invoicemanager#main invoicemanager
```

Change Directory

```sh
cd invoicemanager
```

Install the Dependencies

```sh
# This project uses pnpm but you can use your favorite package manager.
# Just make sure to remove the lockfile before installation is not using pnpm
pnpm install
```

This starts your app in development mode, rebuilding assets on file changes.

```sh
pnpm run dev
```

### Deployment

First, build your app for production:

```sh
pnpm run build
```

Then run the app in production mode:

```sh
pnpm start
```

Now you'll need to pick a host to deploy it to.

### Do It Yourself

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
