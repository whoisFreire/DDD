export class Slug {
  private _value: string

  private constructor(value: string) {
    this._value = value
  }

  get value() {
    return this._value
  }

  static create(slug: string): Slug {
    return new Slug(slug)
  }

  /**
   * Recieves a string and normalize it as a slug
   *
   * Example: "An example title" -> "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}
