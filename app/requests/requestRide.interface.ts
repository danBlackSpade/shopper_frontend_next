
export interface IEstimateRideInput {
  userId: string,
  origin: string,
  destination: string,
}

export interface IRideOptions {
  distance: string,
  duration: string,
  distanceValue: number,
  durationValue: number,
  // value: number,
  // origin: string,
  // destination: string,
  id: string,
  name: string,
  car: string,
  description: string,
  rating: {
    value: number,
    description: string,
  },
  price: string,

}

export interface IDriver {
  id: string,
  name: string,
  car: string,
  description: string,
  rating: {
    value: number,
    description: string,
  },
  price: string,
}

export interface IRideRequest {
  customer_id: string,
  driver: {
    id: string,
    name: string,
  },
  origin: string,
  destination: string,
  distance: string,
  distanceValue: number,
  durationValue: number,
  duration: string,
  value: string,
}

// export interface IRideSearch {
//   customer_id: string,
//   driver: {
//     id: string,
//     name: string,
//   },
//   origin: string,
//   destination: string,
//   distance: number,
//   duration: string,
//   value: number,
// }


