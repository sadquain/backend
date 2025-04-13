import { Column, Entity, PrimaryColumn } from 'typeorm';
import { VectorTransformer } from '../common/vector.transformer';

@Entity()
export class Candidate {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  bio: string;

  @Column({
    type: 'text',
    transformer: VectorTransformer,
    nullable: true,
  })
  embedding: number[];
}