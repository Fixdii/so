import { MyQuestionsPipe } from './my-questions.pipe';

describe('MyQuestionsPipe', () => {
  it('create an instance', () => {
    const pipe = new MyQuestionsPipe();
    expect(pipe).toBeTruthy();
  });
});
