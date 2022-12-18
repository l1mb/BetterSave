export interface Aim {
  id?: string;
  aimType: AimType;
  name: string;
  userId: string;
  amount: number;
  finishDate: Date;
}

export enum AimType {
  daily,
  saveToDate,
}
