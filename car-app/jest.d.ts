// jest.d.ts
import 'jest';

declare module 'jest' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    // Add more if needed
  }
}
