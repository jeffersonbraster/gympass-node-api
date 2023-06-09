import { MakeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return value >= -90 && value <= 90
    }),
    longitude: z.number().refine((value) => {
      return value >= -180 && value <= 180
    }),
  })

  const { name, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body)

  const createGymUseCase = MakeCreateGymUseCase()

  await createGymUseCase.execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
