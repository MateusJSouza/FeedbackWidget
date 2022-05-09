import { SubmitFeedbackUseCase } from "./submit-feedbacks-use-case"

// spies => espiões

// jest.fn() -> Função espiã
const sendMailSpy = jest.fn()
const createFeedbackSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  // Testando se consigo enviar um feedback na minha aplicação
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64',
    })).resolves.not.toThrow();
    // .resolves.not.toThrow() -> se resolver, não dispare nenhum erro

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  });

  // Testando se consigo enviar um feedback na minha aplicação sem um tipo
  it('should be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64',
    })).rejects.toThrow();
  });

  // Testando se consigo enviar um feedback na minha aplicação sem um comentário
  it('should be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'example comment',
      comment: '',
      screenshot: 'data:image/png;base64',
    })).rejects.toThrow();
  });

  // Testando se consigo enviar um feedback na minha aplicação sem uma captura de tela inválida
  it('should be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Tá tudo bugado',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
})