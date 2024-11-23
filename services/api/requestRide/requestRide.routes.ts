import { apiClient } from "../apiClient";
import { IEstimateRideInput } from "../../../app/requests/requestRide.interface";

export const postEstimateRide = async (data: IEstimateRideInput) => {
  try {
    const response = await apiClient.post('/ride/estimate', data)
    return response
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao obter os dados. Tente novamente. Details: ');
  }
}

export const patchConfirmRide = async (data: { userId: string, rideOptionId: string }) => {
  try {
    const response = await apiClient.patch('/ride/confirm', data)
    return response
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao obter os dados. Tente novamente. Details: ');
  }
}




