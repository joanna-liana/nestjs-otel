export interface DraftArticleProps {
  id?: number;
  title: string;
  description?: string | null;
  body: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArticleProps extends DraftArticleProps {
  title: string;
  description: string | null;
  body: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Article {
  constructor(public readonly props: ArticleProps) {}

  get canBePublished() {
    return !!this.props.title.length && !!this.props.body.length;
  }

  static createDraft(props: DraftArticleProps): Article {
    return new Article({
      ...props,
      description: props.description ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: false,
    });
  }
}
