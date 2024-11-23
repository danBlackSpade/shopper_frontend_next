import { apiClient } from "../apiClient";
import { EstimateRideInput } from "../../../app/requests/requestRide.interface";

export const estimateRide = async (data: EstimateRideInput) => {
  try {
    const response = await apiClient.post('/ride/estimate', data)
    return response
  } catch (err) {
    throw new Error('Erro ao obter os dados. Tente novamente. Details: ' + err);
  }

}

