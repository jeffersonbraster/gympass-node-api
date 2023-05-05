import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('get user matrics use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get checkins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-id-02',
      user_id: 'user-id-1',
    })

    await checkInsRepository.create({
      user_id: 'user-id-1',
      gym_id: 'gym-id-01',
    })

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'user-id-1',
    })

    expect(checkInsCount).toEqual(2)
  })
})
