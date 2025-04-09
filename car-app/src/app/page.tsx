'use client';
// Main home page — shows list of cars and allows adding a new car
import React from 'react'; 
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Car } from '@/types/car';

// State setup for car list, form values, and modal visibility
export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [form, setForm] = useState({ make: '', model: '', year: '', vrn: ''});
  const [showForm, setShowForm] = useState(false);

  // On component load, fetch all cars from the API
  useEffect(() => {
    fetch('/api/cars')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load cars');
        return res.json();
      })
      .then(setCars)
      .catch((err) => {
        console.error('Fetch error:', err);
        setCars([]);
      });
  }, []);
  
  // Submit form: POST new car, update state, close modal
  async function addCar(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const newCar = await res.json();
    setCars([...cars, newCar]);
    setForm({ make: '', model: '', year: '', vrn: '' });
    setShowForm(false);
  }

  // Delete car by ID from local state
  async function deleteCar(id: number) {
    await fetch(`/api/cars/${id}`, { method: 'DELETE' });
    setCars(cars.filter(c => c.id !== id));
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-6 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold"> Car Health Monitoring System</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create New Car
        </button>
      </div>

      {/* Car List */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-4">
      {cars && cars.length > 0 ? (
        cars.map((car) => (
          <div
            key={car.id}
            className="p-4 bg-gray-100 rounded shadow-sm flex flex-col gap-1"
          >
            <Link href={`/car/${car.id}`} className="font-semibold hover:underline">
              {car.make} {car.model} ({car.year}) - {car.vrn}
            </Link>
            <p className="text-sm text-gray-600">
              Health: {car.healthStatus} | Faults: {car.faultCount}
            </p>
            <button
              onClick={() => deleteCar(car.id)}
              className="text-red-600 hover:underline text-sm mt-1 w-fit"
            >
              Deactivate Car
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No cars to display.</p>
      )}

      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Add a New Car</h2>
            <form onSubmit={addCar} className="space-y-4">
              <input
                placeholder="Make"
                value={form.make}
                onChange={(e) => setForm({ ...form, make: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                placeholder="Model"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                placeholder="Year"
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                placeholder="VRN"
                value={form.vrn}
                onChange={(e) => setForm({ ...form, vrn: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Sumbit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
