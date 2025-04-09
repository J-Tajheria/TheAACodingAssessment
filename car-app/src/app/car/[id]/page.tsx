'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Car } from '@/types/car';

export default function CarDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          setCar(null);
        } else {
          setCar(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch car:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!car) return <p className="p-6 text-center text-red-500">Car not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">{car.make} {car.model}</h2>
      <p className="mb-1">Year: {car.year}</p>
      <p className="mb-1">VRN: {car.vrn}</p>
      <p className="mb-1">Health Status: {car.healthStatus}</p>
      <p className="mb-4">Fault Count: {car.faultCount}</p>
      <button
        onClick={() => router.push('/')}
        className="text-blue-600 hover:underline"
      >
        ← Back to list
      </button>
    </div>
  );
}
