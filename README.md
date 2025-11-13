# Outdoor Grill Center

A Next.js + Payload CMS application for BBQ grill and smoker reviews, deployed on Cloudflare Workers.

## Features

- **Payload CMS 3.0** - Headless CMS for content management
- **Cloudflare D1** - SQLite database at the edge
- **Cloudflare R2** - Object storage for images
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

## Quick Start

### Prerequisites

- Node.js 18.20.2+ or 20.9.0+
- pnpm 9 or 10
- Cloudflare account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your PAYLOAD_SECRET
   ```

### Local Development

#### Development Modes

The application supports two development modes for flexibility:

**Remote Mode** (Default - uses production services):
```bash
# .env.local
USE_REMOTE_R2=true

# Start dev server
pnpm dev

# Seed database
pnpm seed
```

**Local Mode** (uses local simulations):
```bash
# .env.local
USE_REMOTE_R2=false

# Or use local commands (overrides .env.local)
pnpm dev:local    # Local R2 + Local D1
pnpm seed:local   # Seeds local storage
```

**When to use each mode:**

| Feature | Remote Mode | Local Mode |
|---------|-------------|------------|
| **Images** | Cloudflare R2 bucket | `.wrangler/state/v3/r2/` |
| **Database** | Remote D1 | `.wrangler/state/v3/d1/` |
| **Speed** | Network latency | Instant (local) |
| **Use Case** | Content creation, production data | Fast iteration, experiments |

## Architecture

### Collections

- **Users** - Authentication-enabled collection for admin access
- **Media** - Uploads collection with R2 storage integration
- **Reviews** - BBQ grill and smoker product reviews with ratings
- **Authors** - Review authors with bio and image
- **Categories** - Product categories (Pellet Grills, Gas Grills, etc.)

### Globals

- **Settings** - Site-wide settings including logos, SEO, and contact info

### Image Storage (R2)

Images are stored in Cloudflare R2 object storage with the following configuration:

- **Remote mode**: Images upload directly to the production R2 bucket
- **Local mode**: Images stored in `.wrangler/state/v3/r2/` for development
- **Configuration**: `wrangler.jsonc` with `"remote": true` enables remote R2
- **Adapter**: `@payloadcms/storage-r2` handles uploads and URL generation

### Database (D1)

- SQLite database at the edge via Cloudflare D1
- Automatic schema migrations with Payload's migration system
- Local development uses `.wrangler/state/v3/d1/` for instant feedback
- Read replicas can be enabled (see [Payload docs](https://payloadcms.com/docs/database/sqlite#d1-read-replicas))

## Available Commands

```bash
# Development
pnpm dev              # Start dev server (uses .env.local settings)
pnpm dev:local        # Force local R2 + D1 (overrides .env.local)
pnpm devsafe          # Clean dev start (removes .next and .open-next)

# Database
pnpm seed             # Seed database (respects .env.local)
pnpm seed:local       # Seed local database only
pnpm migrate          # Run migrations
pnpm migrate:create   # Create a new migration

# Build & Deploy
pnpm build            # Build for production
pnpm deploy           # Deploy to Cloudflare (database + app)
pnpm preview          # Preview production build locally

# Utilities
pnpm generate:types   # Generate TypeScript types
pnpm lint             # Run ESLint
```

## Working with Cloudflare

### Authentication

First, authenticate with Wrangler:

```bash
pnpm wrangler login
```

This connects Wrangler to your Cloudflare account. Use `pnpm wrangler help` to see all available commands.

### Wrangler Configuration

The `wrangler.jsonc` file configures your Cloudflare resources:

- **D1 Database**: `outdoorgrillcenter` (SQLite)
- **R2 Bucket**: `outdoorgrillcenter` (object storage)
- **Remote bindings**: Enabled for both D1 and R2 when `USE_REMOTE_R2=true`

Wrangler automatically binds services for local development based on your `.env.local` configuration.

## Deployment

### First-Time Setup

1. Create a Cloudflare D1 database and R2 bucket (if not already done)
2. Update `wrangler.jsonc` with your database and bucket IDs
3. Create and run migrations:
   ```bash
   pnpm migrate:create
   pnpm migrate
   ```

### Deploy to Production

```bash
pnpm deploy
```

This command will:
1. Run database migrations on remote D1
2. Build the Next.js application
3. Deploy to Cloudflare Workers

The deployment uses the `opennextjs-cloudflare` adapter to optimize Next.js for Cloudflare Workers.

### Environment Variables

Set production environment variables in the Cloudflare dashboard or via Wrangler:

```bash
# Set PAYLOAD_SECRET in production
wrangler secret put PAYLOAD_SECRET
```

### CI/CD

You can integrate these deployment steps into your CI/CD pipeline. Ensure your pipeline has:
- Cloudflare API token with appropriate permissions
- Access to your repository
- Node.js and pnpm installed

## Enabling logs

By default logs are not enabled for your API, we've made this decision because it does run against your quota so we've left it opt-in. But you can easily enable logs in one click in the Cloudflare panel, [see docs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#enable-workers-logs).

## Troubleshooting

### Images Not Uploading to R2

If images aren't appearing in your R2 bucket:

1. **Check `wrangler.jsonc`**: Ensure `"remote": true` is set in the R2 bucket config:
   ```jsonc
   "r2_buckets": [
     {
       "binding": "R2",
       "bucket_name": "outdoorgrillcenter",
       "remote": true
     }
   ]
   ```

2. **Verify `.env.local`**: Ensure `USE_REMOTE_R2=true` for remote uploads

3. **Restart dev server**: After changing config files, restart the dev server

### Database Connection Issues

- Ensure you're authenticated: `pnpm wrangler login`
- Check that D1 database exists in your Cloudflare dashboard
- Verify `database_id` in `wrangler.jsonc` matches your D1 database

## Known Limitations

### Worker Size Limits

**This requires Cloudflare Paid Workers plan** due to 3MB bundle size limits. The application bundle exceeds the free tier limit.

### GraphQL Support

Full GraphQL support is limited when deployed due to [upstream issues in Workers](https://github.com/cloudflare/workerd/issues/5175). REST API endpoints work without issues.

### Image Processing

Sharp (image processing library) is not available in Workers. Image transformations like resizing and cropping are disabled in the Media collection configuration.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
