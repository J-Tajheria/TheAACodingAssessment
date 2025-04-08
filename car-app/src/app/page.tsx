'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Car } from '@/types/car';

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [form, setForm] = useState({ make: '', model: '', year: '' });

  useEffect(() => {
    fetch('/api/cars')
      .then(res => res.json())
      .then(setCars);
  }, []);

  async function addCar(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const newCar = await res.json();
    setCars([...cars, newCar]);
    setForm({ make: '', model: '', year: '' });
  }

  async function deleteCar(id: number) {
    await fetch(`/api/cars/${id}`, { method: 'DELETE' });
    setCars(cars.filter(c => c.id !== id));
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Car Viewer</h1>

      <form onSubmit={addCar} className="space-y-4 mb-8">
        <input
          placeholder="Make"
          value={form.make}
          onChange={(e) => setForm({ ...form, make: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          required
        />
        <input
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          required
        />
        <input
          placeholder="Year"
          type="number"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Car
        </button>
      </form>

      <ul className="space-y-3">
        {cars.map(car => (
          <li key={car.id} className="flex justify-between items-center bg-gray-100 p-3 rounded shadow-sm">
            <Link href={`/car/${car.id}`} className="hover:underline">
              {car.make} {car.model} ({car.year})
            </Link>
            <button onClick={() => deleteCar(car.id)} className="text-red-600 hover:underline">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
