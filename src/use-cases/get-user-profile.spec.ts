import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let getProfileUseCase: GetUserProfileUseCase
describe('User Profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    getProfileUseCase = new GetUserProfileUseCase(usersRepository)
  })
  it('should be able to get user profile', async () => {
    const userCreated = await usersRepository.create({
      name: 'Jeje',
      email: 'jeje@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await getProfileUseCase.execute({
      userId: userCreated.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Jeje')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(
      async () =>
        await getProfileUseCase.execute({
          userId: '123456',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
