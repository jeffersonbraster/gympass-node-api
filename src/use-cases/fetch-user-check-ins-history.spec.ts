import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let fetchUserCheckInsUseCase: FetchUserCheckInsHistoryUseCase

describe('checkins history use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    fetchUserCheckInsUseCase = new FetchUserCheckInsHistoryUseCase(
      checkInsRepository,
    )
  })

  it('should be able to list check ins to user', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-id-02',
      user_id: 'user-id-1',
    })

    await checkInsRepository.create({
      user_id: 'user-id-1',
      gym_id: 'gym-id-01',
    })

    const { checkIns } = await fetchUserCheckInsUseCase.execute({
      userId: 'user-id-1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-id-02',
      }),
      expect.objectContaining({
        gym_id: 'gym-id-01',
      }),
    ])
  })

  it('should be able to fetch paginate check ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id-1',
      })
    }

    const { checkIns } = await fetchUserCheckInsUseCase.execute({
      userId: 'user-id-1',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-id-21',
      }),
      expect.objectContaining({
        gym_id: 'gym-id-22',
      }),
    ])
  })
})
