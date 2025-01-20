# NextJS Auth Template

Authentication template for NextJS. Sets up examples of authenticated access from the server and client using Next-Auth.

## Technologies used

- NextJS
- Next-Auth (a.k.a Auth.js)
- Prisma
- MongoDB (replace with any Prisma supported DB)
- TailwindCSS

## Features

- Credential auth
- OAuth examples with Google and GitHub
- Sign in and registration forms
- Supports role-based access control

## Getting started

1. Copy `.env.example` to `.env.local`
2. Setup database connection and add your `DATABASE_URL` string
3. Install dependencies and run dev server

```sh
npm i
npx prisma generate
npm run dev
```
