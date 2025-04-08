import { NextResponse } from 'next/server';
import { cars } from '@/data/cars';

export async function GET() {
  return NextResponse.json(cars);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newCar = {
    id: Date.now(),
    make: body.make,
    model: body.model,
    year: parseInt(body.year),
  };
  cars.push(newCar);
  return NextResponse.json(newCar, { status: 201 });
}
