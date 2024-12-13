# Podatki Stankiewicz Website

## Development Setup

1. Install dependencies for the main project:
```bash
npm install
```

2. Install and start the proxy server (required for VAT verification):
```bash
cd proxy
npm install
npm start
```

3. Start the development server (in a new terminal):
```bash
npm run dev
```

## VAT Verification

The VAT verification feature requires a local proxy server to handle CORS issues with the VIES API. The proxy server is located in the `proxy` directory and needs to be running alongside the main development server.

### Setup Steps:
1. Navigate to the proxy directory: `cd proxy`
2. Install dependencies: `npm install`
3. Start the proxy: `npm start`
4. The proxy server will run on port 3001
5. Keep the proxy server running while using VAT verification features

## Available Scripts

Main project:
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

Proxy server:
- `cd proxy && npm start` - Start the VAT verification proxy server
