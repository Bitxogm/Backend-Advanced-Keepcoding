import type { UserRepository } from '@/domain/repositories/UserRepository';
import type SecurityServices from '@/domain/services/SecurityServices';
import { UnauthorizedError } from '@/domain/types/errors';

export class LoginUserUseCase {
  private readonly userRepository: UserRepository;

  private readonly securityService: SecurityServices; // Agrega el servicio de seguridad si es necesario

  constructor(userRepository: UserRepository, securityService: SecurityServices) {
    this.userRepository = userRepository;
    this.securityService = securityService;
  }

  async execute({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    const existingUser = await this.userRepository.findUserByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedError('User not found');
    }

    try {
      await this.securityService.comparePasswords(password, existingUser.password);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      throw new UnauthorizedError('Invalid password');
    }
    const token = await this.securityService.generateJWT(existingUser);
    return { token };
  }
}
