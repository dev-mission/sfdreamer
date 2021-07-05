import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import classNames from 'classnames';

import Api from '../Api';
import UnexpectedError from '../UnexpectedError';
import ValidationError from '../ValidationError';

function QuestionnaireForm() {
  const { id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [questionnaire, setQuestionnaire] = useState({
    title: '',
    explanation: '',
  });
  const [isUploading, setUploading] = useState(false);

  useEffect(
    function () {
      if (id) {
        Api.questionnaire.get(id).then((response) => setQuestionnaire(response.data));
      }
    },
    [id]
  );

  function onChange(event) {
    const newQuestionnaire = { ...questionnaire };
    newQuestionnaire[event.target.name] = event.target.value;
    setQuestionnaire(newQuestionnaire);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      if (id) {
        await Api.questionnaire.update(id, questionnaire);
      } else {
        await Api.questionnaire.create(questionnaire);
      }
      history.push('/questionnaire');
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
      <h1>Questionnaire</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="title">Title: </label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('title') })}
            type="text"
            id="title"
            name="title"
            required
            onChange={onChange}
            value={questionnaire.title}
          />
          {error?.errorMessagesHTMLFor?.('title')}
        </div>

        <div className="mb-3">
          <label htmlFor="explanation">Explanation: </label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('explanation') })}
            type="text"
            id="explanation"
            name="explanation"
            required
            onChange={onChange}
            value={questionnaire.explanation}
          />
          {error?.errorMessagesHTMLFor?.('explanation')}
        </div>

        <button disabled={isUploading} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
export default QuestionnaireForm;
