import { NextResponse } from 'next/server';
import { cars } from '@/data/cars';
import { getRandomHealthStatus, getRandomFaultCount } from '@/utils/randomGenerator';
// Handles GET (get all cars) and POST (create a new car)
// Uses in-memory array (`cars`) as temporary database

export async function GET() {
  // Return all cars as JSON
  return NextResponse.json(cars);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newCar = {
    id: Date.now(), // unique ID
    make: body.make,
    model: body.model,
    year: parseInt(body.year),
    vrn: body.vrn,
    // Randomly generate some car data for demo
    healthStatus: getRandomHealthStatus(),
    faultCount: getRandomFaultCount(),
  };

  cars.push(newCar);
  return NextResponse.json(newCar, { status: 201 });
}