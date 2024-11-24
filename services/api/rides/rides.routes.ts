import { toast } from "sonner";
import { apiClient } from "../apiClient";
import { AxiosError } from "axios";


export const getCustomerRides = async (userId: string, driverId?: string | null) => {
  try {

    if (!userId) {
      throw new Error('Por favor, insira o ID do usuário. ');
    }

    if (driverId === 'all') {
      driverId = null;
    }
    const endpoint = driverId ? `/ride/${userId}/${driverId}` : `/ride/${userId}`;
    const response = await apiClient.get(endpoint);

    toast.success('Dados carregados com sucesso. ');
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError && err?.response?.data) {
      console.log('error_code', err?.response?.data.error_code);
      throw new Error(err?.response?.data.error_description);
    }
    throw new Error('Erro ao obter os dados. Tente novamente. api2 ');
  }
}