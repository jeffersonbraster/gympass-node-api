import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let fetchGymsNearbyRepository: InMemoryGymsRepository
let fetchGymsNearbyUseCase: FetchNearbyGymsUseCase

describe('search gyms nearby use case', () => {
  beforeEach(() => {
    fetchGymsNearbyRepository = new InMemoryGymsRepository()
    fetchGymsNearbyUseCase = new FetchNearbyGymsUseCase(
      fetchGymsNearbyRepository,
    )
  })

  it('should be able to fetch nearby gyms', async () => {
    await fetchGymsNearbyRepository.create({
      name: 'near gym',
      description: 'description',
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: '123456789',
    })

    await fetchGymsNearbyRepository.create({
      name: 'far gym',
      description: 'description',
      latitude: -27.0610928,
      longitude: -49.5229501,
      phone: '123456789',
    })
    const { gyms } = await fetchGymsNearbyUseCase.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        name: 'near gym',
      }),
    ])
  })
})
