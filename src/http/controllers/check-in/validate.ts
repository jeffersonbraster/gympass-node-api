import { MakeValidateCheckInsUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validadeCheckInsParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validadeCheckInsParamsSchema.parse(request.params)

  const makeValidadeCheckInUseCase = MakeValidateCheckInsUseCase()

  await makeValidadeCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
