export class Product {
  readonly id: string;
  name: string;
  description: string;
  readonly createdAt: Date;

  constructor({
    id,
    name,
    description,
    createdAt,
  }: {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
  }
}

export default Product;
