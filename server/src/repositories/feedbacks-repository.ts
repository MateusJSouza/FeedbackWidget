export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

// Ações que a aplicação pode fazer com o banco de dados
export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}