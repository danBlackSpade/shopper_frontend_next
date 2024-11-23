import { apiClient } from "../apiClient";


export const getCustomerRides = async (userId: string, driverId?: string) => {
  try {
 
    const endpoint = driverId ? `/ride/${userId}/${driverId}` : `/ride/${userId}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (err) {
    throw new Error('Erro ao obter os dados. Tente novamente. Details: ' + err);
  }
}