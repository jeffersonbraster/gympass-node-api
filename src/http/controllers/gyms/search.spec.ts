import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('search gyms e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to search gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'gym js',
        description: 'some desc',
        phone: '123456789',
        latitude: -27.2092052,
        longitude: -49.6401092,
      })

    await request(app.server)
      .post('/gyms')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'gym typescript',
        description: 'some desc',
        phone: '123456789',
        latitude: -27.2092052,
        longitude: -49.6401092,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'js',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'gym js',
      }),
    ])
  })
})
