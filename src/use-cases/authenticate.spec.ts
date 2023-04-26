import { expect, describe, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase
describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Jeje',
      email: 'jeje@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'jeje@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(
      async () =>
        await authenticateUseCase.execute({
          email: 'jeje@gmail.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Jeje',
      email: 'jeje@gmail.com',
      password_hash: await hash('123456', 6),
    })

    expect(
      async () =>
        await authenticateUseCase.execute({
          email: 'jeje@gmail.com',
          password: '12345678',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
