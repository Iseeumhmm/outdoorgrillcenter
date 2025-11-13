// Load environment variables for standalone scripts (seed, migrate, etc.)
import { config as loadEnv } from 'dotenv'
loadEnv({ path: '.env.local' })

// storage-adapter-import-placeholder
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite' // database-adapter-import
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Reviews } from './collections/Reviews'
import { Authors } from './collections/Authors'
import { Categories } from './collections/Categories'
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Use remote R2 bindings if explicitly enabled or in production
const cloudflareRemoteBindings =
  process.env.USE_REMOTE_R2 === 'true' || process.env.NODE_ENV === 'production'
// Always use Wrangler for standalone scripts (payload commands, seed, etc.)
// Only use getCloudflareContext when running in Next.js dev server
// Check if running standalone script by looking for specific patterns or if Next.js is not initialized
const isStandaloneScript =
  process.argv.some(
    (arg) => arg.includes('tsx') || arg.includes('seed') || arg.match(/^(generate|migrate):?/),
  ) || !process.env.NEXT_RUNTIME

const cloudflare = isStandaloneScript
  ? await getCloudflareContextFromWrangler()
  : cloudflareRemoteBindings
    ? await getCloudflareContext({ async: true })
    : await getCloudflareContextFromWrangler()

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Reviews, Authors, Categories],
  globals: [Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // database-adapter-config-start
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,
    push: process.env.PAYLOAD_DISABLE_AUTO_PUSH !== 'true' && process.env.NODE_ENV !== 'production',
  }),
  // database-adapter-config-end
  plugins: [
    // storage-adapter-placeholder
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: {
        media: {
          generateFileURL: ({ filename, prefix }) => {
            const baseUrl = 'https://pub-3d6392b988ce45719e4aa0b0e6684cad.r2.dev'
            return `${baseUrl}/${prefix ? `${prefix}/` : ''}${filename}`
          },
        },
      },
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        experimental: { remoteBindings: cloudflareRemoteBindings },
      } satisfies GetPlatformProxyOptions),
  )
}
