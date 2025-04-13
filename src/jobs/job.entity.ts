import { Column, Entity, PrimaryColumn } from 'typeorm';
import { VectorTransformer } from '../common/vector.transformer';

@Entity()
export class Job {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'text', // Use 'text' to store vector string
    transformer: VectorTransformer,
    nullable: true,
  })
  embedding: number[];
}