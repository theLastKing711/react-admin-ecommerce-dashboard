export interface CreateAppUserDto {
    userName: string;
    password: string;
    file: File;
  }

  export interface UpdateAppUserDto {
    id: number;
    userName: string;
    password: string;
    file?: File;
  }

  export interface ResponseAppUserDto {
    id: number;
    createdAt: Date;
    userName: string;
    imagePath: string;
  }