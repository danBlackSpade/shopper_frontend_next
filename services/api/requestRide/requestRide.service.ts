  import { IEstimateRideInput, IRideRequest } from "@/app/requests/requestRide.interface";
import { apiClient } from "../apiClient";
import { toast } from "sonner";

export async function estimateRide(data: IEstimateRideInput) {
  try {
    const response = await apiClient.post('/ride/estimate', data)
    console.log('@@@response', response.data);
    if (response.data.availableDrivers.length === 0) {
      toast.warning('Nenhum motorista disponível para essa rota. ');
    } else {
      toast.success('Estimativa de viagem calculada com sucesso! ');
    }
    return response.data
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao obter os dados. Tente novamente. ');
  }
}


export async function confirmRide(data: IRideRequest) {
  try {
    const response = await apiClient.patch('/ride/confirm', data)
    return response.data
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao obter os dados. Tente novamente. ');
  }
}

