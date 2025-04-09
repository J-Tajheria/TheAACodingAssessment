import { NextResponse } from 'next/server';
import { cars } from '@/data/cars';

export async function GET() {
  return NextResponse.json(cars);
}