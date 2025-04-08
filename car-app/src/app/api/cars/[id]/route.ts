import { NextResponse } from 'next/server';
import { cars } from '@/data/cars';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const car = cars.find((c) => c.id === parseInt(params.id));
  return car
    ? NextResponse.json(car)
    : NextResponse.json({ error: 'Car not found' }, { status: 404 });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const index = cars.findIndex((c) => c.id === parseInt(params.id));
  if (index === -1) {
    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  }
  const removed = cars.splice(index, 1);
  return NextResponse.json(removed[0]);
}
