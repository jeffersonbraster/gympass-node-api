import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let searchGymsRepository: InMemoryGymsRepository
let searchGymsUseCase: SearchGymsUseCase

describe('search gyms use case', () => {
  beforeEach(() => {
    searchGymsRepository = new InMemoryGymsRepository()
    searchGymsUseCase = new SearchGymsUseCase(searchGymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await searchGymsRepository.create({
      name: 'javascript gym',
      description: 'description',
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: '123456789',
    })

    await searchGymsRepository.create({
      name: 'typescript gym',
      description: 'description',
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: '123456789',
    })
    const { gyms } = await searchGymsUseCase.execute({
      query: 'javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        name: 'javascript gym',
      }),
    ])
  })

  it('should be able to fetch paginate gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await searchGymsRepository.create({
        name: `${i} gym`,
        description: 'description',
        latitude: -27.2092052,
        longitude: -49.6401091,
        phone: '123456789',
      })
    }

    const { gyms } = await searchGymsUseCase.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        name: '21 gym',
      }),
      expect.objectContaining({
        name: '22 gym',
      }),
    ])
  })
})
