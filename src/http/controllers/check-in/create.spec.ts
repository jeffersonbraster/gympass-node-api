import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('create check-in e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to create checkin', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        name: 'gym js',
        description: 'some desc',
        phone: '123456789',
        latitude: -27.2092052,
        longitude: -49.6401092,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        latitude: -27.2092052,
        longitude: -49.6401092,
      })

    expect(response.statusCode).toBe(201)
  })
})
