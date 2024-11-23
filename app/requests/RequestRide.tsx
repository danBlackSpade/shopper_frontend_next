// app/requests/RequestRide.tsx
'use client'
import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { apiClient } from '@/services/api/apiClient';
import { RideOption } from './requestRide.interface';
import { getRideEstimate } from '@/services/api/requestRide/requestRide.service';





export default function RequestRide() {
  const [userId, setUserId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');
  const [rideOption, setRideOption] = useState<RideOption[] | null>(null);

  // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    if (!userId || !origin || !destination || origin === destination) {
      setError('Por favor, preencha todos os campos corretamente.')
      return;
    }

    setError(''); // Resetar erro

    try {
      // console.log('userId', userId, 'origin', origin, 'destination', destination)
      // Requisição para a API de estimativa de viagem
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ride/estimate`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ userId, origin, destination }),
      // });

      // const response = await apiClient.post('/ride/estimate', { userId, origin, destination })
      const r = await getRideEstimate({ userId, origin, destination })
      console.log('response', r)
      console.log('rideOption', rideOption)
      setRideOption(r.availableDrivers)
      // const data = await response.json();
      // setRideOptions(data); // Supondo que a resposta seja um objeto com informações de motoristas
    } catch (err) {
      setError('Erro ao obter os dados. Tente novamente. Details: ' + err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Solicitação de Viagem</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">ID do Usuário</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Digite seu ID"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Endereço de Origem</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Digite o endereço de origem"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Endereço de Destino</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Digite o endereço de destino"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium rounded-lg py-2 mt-4 hover:bg-blue-600 transition"
        >
          Estimar Valor da Viagem
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      {rideOption && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rideOption.map((option) => (
          <div
            key={option.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start border border-gray-200 hover:shadow-lg transition-shadow"
          >
            {/* <div className="top-2 right-2 bg-indigo-600 text-white text-sm font-semibold py-1 px-3 rounded-lg shadow">
              {option.price}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{option.name}</h3> */}
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-bold text-gray-800">{option.name}</h3>
              <div className="bg-indigo-500 text-white text-small font-semibold py-1 px-3 rounded-lg shadow">R$ {option.price}</div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Carro: {option.car}</p>
            <p className="text-sm text-gray-600">Descrição: {option.description}</p>
            {/* <p className="text-sm text-gray-600">Valor: <span className="font-bold text-gray-800">{option.price}</span></p> */}
            <p className="text-sm text-gray-600">
              Avaliação: <span className="font-bold text-gray-800">{option.rating.value}</span>
            </p>
            <p className="text-sm text-gray-600">{option.rating.description}</p>
            <button
              className="mt-auto w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors justify-center"
            >
              Escolher
            </button>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
