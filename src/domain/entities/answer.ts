import { Optional } from "../../core/@types/optional"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

interface AnswerProps {
  content: string
  questionId: UniqueEntityId
  authorId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityId) {
    const answer = new Answer({
      ...props,
      createdAt: new Date()
    }, id)
    return answer
  }
}