import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRow(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, response: FastifyReply) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return response.status(401).send({ message: 'Unauthorized' })
    }
  }
}
