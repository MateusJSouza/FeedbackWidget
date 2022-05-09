import { prisma } from '../../prisma';
import { FeedbackCreateData, FeedbacksRepository } from '../feedbacks-repository';

export default class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot}: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        // Short syntax
        type,
        comment,
        screenshot
      }
    });
  }
}