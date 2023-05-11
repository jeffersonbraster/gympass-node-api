import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return value >= -90 && value <= 90
    }),
    longitude: z.number().refine((value) => {
      return value >= -180 && value <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body)

  const nearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
