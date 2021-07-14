import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import classNames from 'classnames';

import Api from '../Api';
import UnexpectedError from '../UnexpectedError';
import ValidationError from '../ValidationError';

function QuestionForm() {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const [error, setError] = useState(null);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [question, setQuestion] = useState({
    QuestionnaireId: query.get('QuestionnaireId') || '',
    prompt: '',
    answer_type: '',
    questionnaire_type: '',
    step: '',
  });
  const [isUploading] = useState(false);

  useEffect(
    function () {
      Api.questionnaires
        .index()
        .then((response) => {
          setQuestionnaires(response.data);
          if (id) {
            return Api.questions.get(id);
          }
        })
        .then((response) => {
          if (response) {
            setQuestion(response.data);
          }
        });
    },
    [id]
  );

  function onChange(event) {
    const newQuestion = { ...question };
    newQuestion[event.target.name] = event.target.value;
    setQuestion(newQuestion);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      if (id) {
        await Api.questions.update(id, question);
      } else {
        await Api.questions.create(question);
      }
      history.push('/questions');
    } catch (error) {
      if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
        setError(new ValidationError(error.response.data));
      } else {
        setError(new UnexpectedError());
      }
    }
  }

  return (
    <main className="container">
      <h1>{id ? 'Edit' : 'New'} Question </h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="QuestionnaireId">Questionnaire</label>
          <select
            className={classNames('form-select', { 'is-invalid': error?.errorsFor?.('pQuestionnaireIdrompt') })}
            id="QuestionnaireId"
            name="QuestionnaireId"
            required
            onChange={onChange}
            value={question.QuestionnaireId}>
            {questionnaires.map((q) => (
              <option key={q.id} value={q.id}>
                {q.title}
              </option>
            ))}
          </select>
          {error?.errorMessagesHTMLFor?.('proQuestionnaireIdmpt')}
        </div>
        <div className="mb-3">
          <label htmlFor="prompt">prompt</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('prompt') })}
            type="text"
            id="prompt"
            name="prompt"
            required
            onChange={onChange}
            value={question.prompt}
          />
          {error?.errorMessagesHTMLFor?.('prompt')}
        </div>
        <div className="mb-3">
          <label htmlFor="Answer_type">Answer_type</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('answer_type') })}
            type="text"
            id="answer_type"
            name="answer_type"
            onChange={onChange}
            value={question.answer_type}
          />
          {error?.errorMessagesHTMLFor?.('answer_type')}
        </div>
        <div className="mb-3">
          <label htmlFor="questionnaire_type">questionnaire_type</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('questionnaire_type') })}
            type="text"
            id="questionnaire_type"
            name="questionnaire_type"
            onChange={onChange}
            value={question.questionnaire_type}
          />
          {error?.errorMessagesHTMLFor?.('phone')}
        </div>
        <div className="mb-3">
          <label htmlFor="step">step:</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('step') })}
            type="text"
            id="step"
            name="step"
            onChange={onChange}
            value={question.step}
          />
          {error?.errorMessagesHTMLFor?.('step')}
        </div>
        <button disabled={isUploading} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
export default QuestionForm;
