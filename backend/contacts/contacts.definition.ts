export interface IContact {
  id: number;
  name: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
}