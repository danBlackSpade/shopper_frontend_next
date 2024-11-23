'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCustomerRides } from '@/services/api/rides/rides.routes';
import { getDrivers } from '@/services/api/users/users.routes';

interface Ride {
  id: string;
  date: string;
  time: string;
  driverName: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
}

export default function HistoryPage() {
  const [userId, setUserId] = useState<string>('');
  const [driverFilter, setDriverFilter] = useState<string>('all');
  const [rides, setRides] = useState<IRide[]>([]); // List of rides
  const [drivers, setDrivers] = useState<IDriver[]>([]); // Example drivers
  const [error, setError] = useState<string>('');
  const router = useRouter();

  interface IDriver {
    _id: string;
    name: string;
  }
  interface IRide {
    id: string,
    date: string,
    destination: string,
    distance: number,
    driver: IDriver,
    duration: number,
    _id: string,
    origin: string,
    value: number,
    time: string,
  }

  useEffect(() => {

    getDriversData();
    console.log('@@@rides', rides);
  }, []);

  async function getDriversData() {
    const driverList: IDriver[] = [];
    const drivers = await getDrivers();
    // drivers.then((res) => {
    //   res.forEach((driver: IDriver) => {
    //     d.push({ id: driver.id, name: driver.name });
    //   });
    // });

    console.log('@@ drivers', drivers);
    drivers.map((driver: IDriver) => {
      if (driverList.filter((d) => d._id === driver._id).length === 0) {
        driverList.push({ _id: driver._id, name: driver.name });
      }
      // driverList.push({ id: driver.id, name: driver.name });
    });
    setDrivers(driverList);
    // return driverList;
    console.log('$$$$$driversLIST', driverList);
  }


  const handleFilterRides = async () => {
    if (!userId) {
      setError('Por favor, insira o ID do usuário.');
      return;
    }
    setError('');
    try {

      console.log('@@@userId', userId);
      const response = await getCustomerRides(userId).then((res) => {
        console.log(res)
        return res
      })
      console.log(response)

//       Ao aplicar o filtro, deve exibir a lista das viagens realizadas, com:
// ○ data e hora da viagem.
// ○ nome do motorista.
// ○ origem.
// ○ destino.
// ○ distância.
// ○ tempo.
// ○ valor.

      const filteredRides = response.rides.map((ride: IRide) => ({
        id: ride.id,
        _id: ride.id,
        date: new Date(ride.date).toLocaleDateString(),
        time: new Date(ride.date).toLocaleTimeString(),
        driver: {
          _id: ride.driver._id,
          name: ride.driver.name,
        },
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance ,
        duration: ride.duration ,
        value: ride.value,
      }));

      // const filteredRides =
      //   driverFilter === 'all'
      //     ? response.data
      //     : response.data.rides.filter((ride: IRide) => ride.driver.name === driverFilter);

      setRides(filteredRides);
    } catch (err) {
      setError('Erro ao carregar histórico de viagens. Por favor, tente novamente.' + err);
    }
  };

  console.log('@@@rides', rides);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Histórico de Viagens</h1>

      {/* Filter Form */}
      <form
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleFilterRides();
        }}
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">ID do Usuário</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Digite o ID do usuário"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Motorista</label>
          <select
            value={driverFilter}
            onChange={(e) => setDriverFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="all">Todos os motoristas</option>
            {drivers && drivers.length > 0 ? (
              drivers.map((driver) => (
                <option key={driver._id} value={driver.name}>
                  {driver.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Não há motoristas
              </option>
            )}

          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium rounded-lg py-2 mt-4 hover:bg-blue-600 transition"
        >
          Aplicar Filtro
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      {/* Rides List */}
      <div className="mt-8 w-full max-w-5xl">
        {rides &&rides.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rides.map((ride) => (
              <li
                key={ride._id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center mb-4 font-semibold">
                  <h3 className="text-lg font-bold text-gray-800 ">Viagem</h3>
                  <p className="text-sm text-gray-600">
                    {ride.date} às{' '}
                    {ride.time}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Motorista:</span> {ride.driver.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Origem:</span> {ride.origin}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Destino:</span> {ride.destination}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Distância:</span> {ride.distance}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Duração:</span> {ride.duration}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Valor:</span> R$ {ride.value.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center mt-4">Daniel Jun Copyright © 2024 - Todos os direitos reservados.</p>
        )}
      </div>
    </div>
  );
}