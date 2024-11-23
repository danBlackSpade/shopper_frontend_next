import { EstimateRideInput } from "@/app/requests/requestRide.interface";
import { apiClient } from "../apiClient";

export async function getRideEstimate(data: EstimateRideInput) {
  try {
    const response = await apiClient.post('/ride/estimate', data)
    console.log('API SERVICE RESPONSE: ', response)

    return response.data
  } catch (err) {
    throw new Error('Erro ao obter os dados. Tente novamente. Details: ' + err);
  }
}