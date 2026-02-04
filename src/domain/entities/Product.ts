export class Product {
  readonly id: string;
  name: string;
  description: string;
  readonly createdAt: Date;
  readonly userId: string;

  constructor({
    id,
    name,
    description,
    createdAt,
    userId,
  }: {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    userId: string;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.userId = userId;
  }
}

export default Product;
