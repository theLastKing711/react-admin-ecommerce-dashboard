export interface ProductListDto {
    id: number;
    name: string;
  }
  
  export interface ProductListWithCategoryIdDto extends ProductListDto {
    category: {
      id: number;
      name: string;
    };
  }
  