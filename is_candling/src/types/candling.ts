export type Candling = {
  id: number;
  imageUrl: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  fertile: number | null;
  infertile: number | null;
  eggCount: number | null;
  fertileRate: number | null;
  createdAt: Date;
};
