import type { UserRepository } from '@/domain/repositories/UserRepository';
import type { SecurityServices } from '@/domain/services/SecurityServices';
import type { UserCreationQuery } from '@/domain/types/UserCreationQuery';
import { BusinessConflictError } from '@/domain/types/errors';

export class CreateUserUsecase {
  private readonly userRepository: UserRepository;

  private readonly securityService: SecurityServices;

  constructor(userRepository: UserRepository, securityService: SecurityServices) {
    this.userRepository = userRepository;
    this.securityService = securityService;
  }

  async execute(query: UserCreationQuery) {
    if (!query.email || !query.password) {
      throw new BusinessConflictError('Email and password are required');
    }
    const user = await this.userRepository.findUserByEmail(query.email);

    if (user) {
      throw new BusinessConflictError('User with this email already exists');
    }

    const hashedPassword = this.securityService.hashPassword(query.password);

    const createdUser = await this.userRepository.createOne({
      email: query.email,
      password: await hashedPassword,
    });

    return createdUser;
  }
}
