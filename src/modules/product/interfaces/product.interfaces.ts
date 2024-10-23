export interface CreateProductRequest {
    id: number;
    name: string;
    image?: Express.Multer.File;
  }
  