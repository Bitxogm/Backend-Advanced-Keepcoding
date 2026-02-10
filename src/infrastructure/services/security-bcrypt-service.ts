import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import type { User } from '@/domain/entities/User';
import type SecurityServices from '@/domain/services/SecurityServices';
import { UnauthorizedError } from '@/domain/types/errors';

export class SecurityBcryptService implements SecurityServices {
  private readonly jwtSecret: string = 'werikufghweyu8uur';
  verifyJWT(token: string): { userId: string } {
    try {
      const data = jwt.verify(token, this.jwtSecret) as { userId: string };
      return data;
    } catch {
      throw new UnauthorizedError('Invalid or expired token');
    }
  }

  generateJWT(user: User): Promise<string> {
    const token = jwt.sign({ userId: user.id }, this.jwtSecret, {
      expiresIn: '1h',
    });
    return Promise.resolve(token);
  }
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid password');
    } else {
      return isMatch;
    }
  }
}
