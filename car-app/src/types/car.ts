export type Message = {
  id: number;
  status: 'OK' | 'Warning' | 'Fault';
  description: string;
  timestamp: string; // ISO string
};

export type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  vrn: string;
  healthStatus: 'Good' | 'Fair' | 'Poor';
  faultCount: number;
};
