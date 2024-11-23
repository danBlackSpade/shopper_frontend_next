// app/requests/RequestRide.tsx
'use client'
import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { apiClient } from '@/services/api/apiClient';
import { IRideOptions, IRideRequest } from './requestRide.interface';
import { estimateRide, confirmRide } from '@/services/api/requestRide/requestRide.service';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import { toast } from 'sonner';


// interface Rating {
//   value: number;
//   description: string;
// }

// interface RideRequest {
//   customer_id: string;
//   driver: {
//     id: string;
//     name: string;
//   },
//   origin: string;
//   destination: string;
//   distance: number;
//   duration: string;
//   value: number;
// }



export default function RequestRide() {
  const [userId, setUserId] = useState<string>('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');
  const [rideOptions, setRideOptions] = useState<IRideOptions[] | null>(null);
  const [mapUrl, setMapUrl] = useState<string>('');
  const [selectedDriver, setSelectedDriver] = useState<IRideRequest>();

  const router = useRouter();
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
      const r = await estimateRide({ userId, origin, destination });
      // console.log('response', r);
      // console.log('rideOption', rideOptions);
      const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:blue%7Clabel:A%7C${origin}&markers=color:red%7Clabel:B%7C${destination}&path=color:0x0000ff|weight:3|${origin}|${destination}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      setMapUrl(googleMapsUrl);

      const data: IRideOptions[] = [];

      r.availableDrivers.forEach((driver: IRideOptions) => {
        data.push({
          distanceValue: r.googleResp.distanceValue,
          durationValue: r.googleResp.durationValue,
          distance: r.googleResp.distance,
          duration: r.googleResp.duration,
          // value: number,
          // origin: origin,
          // destination: destination,
          id: driver.id,
          name: driver.name,
          car: driver.car,
          description: driver.description,
          rating: {
            value: driver.rating.value,
            description: driver.rating.description,
          },
          price: driver.price,
        });

      })

      setRideOptions(data)

    } catch (err) {
      console.log('error', err);
      setError('Erro ao obter os dados. Tente novamente. ');
    }
  }

  const handleChooseDriver = async (driverId: string) => {
    const selectedOpt = rideOptions?.find(opt => opt.id === driverId);

    if (!selectedOpt) {
      setError('Erro ao selecionar motorista');
      return;
    }

    const data: IRideRequest = {
      customer_id: userId,
      driver: {
        id: driverId,
        name: selectedOpt.name,
      },
      origin,
      destination,
      distance: selectedOpt.distance,
      duration: selectedOpt.duration,
      distanceValue: selectedOpt.distanceValue,
      durationValue: selectedOpt.durationValue,
      value: selectedOpt.price,
    }
    console.log('data', data);

    await setSelectedDriver(data);
    console.log('selectedDriver', selectedDriver);
    try {
      const r = await confirmRide(data);
      console.log('response', r);

      router.push(`/rides/history`);

    } catch (err) {
      setError('Erro ao confirmar a viagem. Tente novamente. Details: ' + err);
    }
  }

  function renderStars(ratingVal: number) {
    const filledStars = Math.floor(ratingVal)
    const hasHalfStar = ratingVal % 1 >= 0.5
    const emptyStars = 5 - Math.ceil(ratingVal)
    const stars = []

    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={i} color="yellow" />)
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" color="yellow" />)
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={i + filledStars} color="gray" />)
    }
    // return stars
    return <div className="flex items-center">{stars}</div>
  }



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

      {mapUrl && (
        <div className="mt-8">
          <h2>Rota Estimada</h2>
          <Image
          src={mapUrl}
          alt="Map Route" 
          className="w-full h-auto rounded-lg shadow-lg mt-4" 
          width={400}
          height={300}
          />

        </div>
      )}

      {rideOptions && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rideOptions.map((option) => (
          <div
            key={option.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full items-start border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-bold text-gray-800">{option.name}</h3>
              <div className="bg-indigo-500 text-white text-small font-semibold py-1 px-3 rounded-lg shadow">
                R$ {option.price}
              </div>

            </div>

            <div className="flex items-center mt-2">
              {renderStars(option.rating.value)}
            </div>


            <div className="w-full mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">Carro: </span>{option.car}
              </p>
            </div>


            <div className="w-full mt-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">Descrição: </span>{option.description}
              </p>
            </div>


            <div className="w-full mt-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">Avaliações: </span>
                {option.rating.description}
              </p>
            </div>

            <div className="flex-1" />
            <button
              className=" mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors justify-center"
              onClick={() => handleChooseDriver(option.id)}
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
