import 'dotenv/config'
import {z} from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if(!_env.success) {
  console.error('❌ Invalid env', _env.error.format())
  throw new Error('Invalid env')
}

export const env = _env.data

