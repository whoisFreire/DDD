import { Entity } from '@/core/entities/entity'
import { randomUUID } from 'node:crypto'

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {}