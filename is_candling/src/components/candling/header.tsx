import { Eye } from 'lucide-react';
import { Button } from '../ui/button';

type CandlingHeaderProps = {
  startCandling: () => void;
};

export default function CandlingHeader({ startCandling }: CandlingHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Candling</h1>
        <p className="text-muted-foreground">
          Pantau dan kelola proses candling telur
        </p>
      </div>
      <Button onClick={startCandling}>
        <Eye className="mr-2 h-4 w-4" />
        Mulai Candling
      </Button>
    </div>
  );
}
