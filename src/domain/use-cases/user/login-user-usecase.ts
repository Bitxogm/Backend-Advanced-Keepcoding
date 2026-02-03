import type { UserRepository } from '@/domain/repositories/UserRepository';
import type SecurityServices from '@/domain/services/SecurityServices';

export class LoginUserUseCase {
  private readonly userRepository: UserRepository;

  private readonly securityService: SecurityServices; // Agrega el servicio de seguridad si es necesario

  constructor(userRepository: UserRepository, securityService: SecurityServices) {
    this.userRepository = userRepository;
    this.securityService = securityService;
  }

  async execute({ email, password }: { email: string; password: string }): Promise<void> {
    const existingUser = await this.userRepository.findUserByEmail(email);

    if (!existingUser) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.securityService.comparePasswords(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    } else {
      await this.securityService.generateJWT(existingUser);
    }
  }
}
