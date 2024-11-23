import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IRideRequest } from '../requests/requestRide.interface';

const RideDetails = () => {
  const router = useRouter();
  const { id } = router.query;  // Get the dynamic `id` from the URL
  const [ride, setRide] = useState<IRideRequest>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Replace with your API call to get the specific ride by ID
      const fetchRide = async () => {
        try {
          const response = await fetch(`/api/rides/${id}`);
          if (!response.ok) {
            throw new Error('Ride not found');
          }
          const data = await response.json();
          setRide(data);
        } catch (err) {
          setError('error ' +err);
        } finally {
          setLoading(false);
        }
      };
      fetchRide();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Ride Details</h1>
      <p><strong>Customer:</strong> {ride?.customer_id}</p>
      <p><strong>Origin:</strong> {ride?.origin}</p>
      <p><strong>Destination:</strong> {ride?.destination}</p>
      <p><strong>Distance:</strong> {ride?.distance} km</p>
      <p><strong>Duration:</strong> {ride?.duration} min</p>
      <p><strong>Value:</strong> {ride?.value}</p>
      {/* <p><strong>Status:</strong> {ride?.status}</p> */}
      <p><strong>Driver:</strong> {ride?.driver?.name}</p>
    </div>
  );
};

export default RideDetails;