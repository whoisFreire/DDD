import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Slug } from "./value-objects/slug"
import { Entity } from "@/core/entities/entity"

interface QuestionProps {
  title: string
  content: string
  authorId: UniqueEntityId
  slug: Slug
  bestAnswerId?: UniqueEntityId 
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {}