import { UniqueEntityId } from "../../core/entities/unique-entity-id"
import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { Optional } from "../../core/@types/optional"

interface QuestionProps {
  title: string
  content: string
  authorId: UniqueEntityId
  slug: Slug
  bestAnswerId?: UniqueEntityId 
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  static create(props: Optional<QuestionProps, 'createdAt'>, id?: UniqueEntityId) {
    const question =  new Question({
      ...props,
      createdAt: new Date()
    }, id)
    return question
  }

}