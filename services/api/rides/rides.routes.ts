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
    console.log('before endpoint', userId, driverId)
    const endpoint = driverId ? `/ride/${userId}/${driverId}` : `/ride/${userId}`;
    const response = await apiClient.get(endpoint);

    console.log('after endpoint', response.data)
    //check if error_code exists
    console.log('Error not found', response.data.error_message)
    
    if (response.status == 404) {
      console.log('%%% status response', response);
      toast.error('response.data.error_message');
      throw new Error(response.data.error_message);  
    }
    if (response.status !== 200) {
      throw new Error('Erro ao obter os dados. Tente novamente. api1 ');
    }
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