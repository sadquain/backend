// vector.transformer.ts
import { ValueTransformer } from 'typeorm';

export const VectorTransformer: ValueTransformer = {
  to: (value: number[] | null) => {
    if (!value) return null;
    return `[${value.join(',')}]`; // Use square brackets for PostgreSQL vectors
  },
  from: (value: string | null) => {
    if (!value) return null;
    // Parse vector string, e.g., '[0.1,0.2,0.3]' to number[]
    return value
      .slice(1, -1) // Remove [ and ]
      .split(',')
      .map((v) => parseFloat(v));
  },
};