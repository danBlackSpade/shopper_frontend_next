
export interface EstimateRideInput {
  userId: string;
  origin: string;
  destination: string;
}

export interface RideOption {
  id: string;
  name: string;
  car: string;
  description: string;
  rating: {
    value: number;
    description: string;
  };
  price: string;
}