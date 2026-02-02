export class User {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;

  constructor(props: { id: string; email: string; password: string; createdAt?: Date }) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt ?? new Date();
  }
}
