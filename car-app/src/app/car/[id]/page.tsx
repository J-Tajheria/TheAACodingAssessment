'use client';
import React from 'react'; 
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Car } from '@/types/car';

export default function CarDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/cars/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Car not found');
          return res.json();
        })
        .then(setCar)
        .catch(() => setError(true));
    }
  }, [id]);

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 text-center">
        <p className="text-red-600 font-semibold">❌ Car not found</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Back to Car List
        </button>
      </div>
    );
  }

  if (!car) {
    return <p className="text-center p-6">Loading car details...</p>;
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {car.make} {car.model} ({car.year})
        </h1>

        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Make</p>
            <p>{car.make}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Model</p>
            <p>{car.model}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Year</p>
            <p>{car.year}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">VRN</p>
            <p>{car.vrn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fault Count</p>
            <p>{car.faultCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Health Status</p>
            <span
              className={`px-2 py-1 rounded text-white text-sm ${
                car.healthStatus === 'Good'
                  ? 'bg-green-500'
                  : car.healthStatus === 'Fair'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            >
              {car.healthStatus}
            </span>
          </div>
        </div>

        <div className="pt-4 text-right">
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:underline"
          >
            ← Back to Car List
          </button>
        </div>
      </div>
    </main>
  );
}
