import { Request, Response } from "express";
export type Type = "income" | "expense"

export interface CategoryShape {
    name: string;
    type: Type;
    user: string;
}

export interface CreateCategory {
    name: string;
    type: Type;
}

export interface UpdateCategory {
    name?: string;
    type?: Type
}

export interface CategoryController {
    createCategory: (req: Request<{}, {}, CreateCategory>, res: Response) => Promise<Response>;
    getCategories: (req: Request, res: Response) => Promise<Response>;
    getCategoryById: (req: Request<{id: string}>, res: Response) => Promise<Response>;
    updateCategory: (req: Request<{categoryId: string}>, res: Response) => Promise<Response>;
    deleteCategory: (req: Request<{categoryId: string}>, res: Response) => Promise<Response>;
}