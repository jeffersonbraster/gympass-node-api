import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let gymUseCase: CreateGymUseCase

describe('Register use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    gymUseCase = new CreateGymUseCase(gymsRepository)
  })
  it('should be able to create gym', async () => {
    const { gym } = await gymUseCase.execute({
      name: 'gym',
      description: 'description',
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: '123456789',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
