import { LedPosition } from './led';

export type Incubator = {
  id: number;
  code: string;
  name: string;
  capacity: number;
  currentEggs: number;
  leds: LedPosition[];
  temperature: number | null;
  humidity: number | null;
  lastUpdate: Date | null;
  status: 'active' | 'inactive';
};
