export type Activity = {
  id: number;
  type: 'SUCCESS' | 'INFO' | 'WARNING';
  action: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
