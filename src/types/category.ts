export type Category = {
    id: string;
    name: string;
    color: string;
}

export type CreateCategory = Pick<Category, "name" | "color">