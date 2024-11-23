import { apiClient } from "../apiClient";

export const getDrivers = async () => {
  try {
    const response = await apiClient.get('/drivers');
    return response.data;
  } catch (err) {
    throw new Error('Erro ao obter os dados. Tente novamente. Details: ' + err);
  }
}