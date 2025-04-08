'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Car } from '@/types/car';

export default function CarDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/cars/${id}`)
        .then(res => res.json())
        .then(setCar);
    }
  }, [id]);

  if (!car) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">{car.make} {car.model}</h2>
      <p className="mb-4 text-gray-600">Year: {car.year}</p>
      <button onClick={() => router.push('/')} className="text-blue-600 hover:underline">
        ← Back to list
      </button>
    </div>
  );
}
