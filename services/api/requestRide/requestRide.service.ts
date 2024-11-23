import { IEstimateRideInput, IRideRequest } from "@/app/requests/requestRide.interface";
import { apiClient } from "../apiClient";

export async function estimateRide(data: IEstimateRideInput) {
  try {
    const response = await apiClient.post('/ride/estimate', data)
    console.log('API SERVICE RESPONSE: ', response)

    return response.data
  } catch (err) {
    throw new Error('Erro ao obter os dados. Tente novamente. Details: ' + err);
  }
}

export async function confirmRide(data: IRideRequest) {
  try {
    const response = await apiClient.patch('/ride/confirm', data)
    return response.data
  } catch (err) {
    throw new Error('Erro ao obter os dados. Tente novamente. Details: ' + err);
  }
}

