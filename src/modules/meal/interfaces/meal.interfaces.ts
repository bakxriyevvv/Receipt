export declare interface CreateMealRequest {
    id: number;
    name: string;
    description: string;
    image?: Express.Multer.File;
    video?:  Express.Multer.File;
    category_id: string;
    user_id: string;
  }
  