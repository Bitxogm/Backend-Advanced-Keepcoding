import { DomainError } from './DomainError';

export class EntityNotFoundError extends DomainError {
  readonly name = 'EntityNotFoundError';
  constructor(entity: string, _id?: string) {
    super(`${entity} not found`);
  }
}
