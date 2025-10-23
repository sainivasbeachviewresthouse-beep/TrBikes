// src/types/bike.ts
export interface Bike {
  id: string;
  name: string;
  registration_no: string;
  category: string;
  color: string;
  rent_per_hour: number;
  image_url?: string;
  availability?: boolean;
}
