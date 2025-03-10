ToDos
- Scrape data for businesses
    - Emails, calling
    - Current site performance
- Integrate AI to automate responses

# Webpres

A modern take and launch of the webpres site. This site uses various open source code and tooling to make this possible. Without their help, we'd have a basic website. 

## Tooling

- [React Router](https://reactrouter.com)
- [Acerternity UI](https://ui.aceternity.com)
- [Resend](https://resend.com)
- [TailwindCSS](https://tailwindcss.com)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```