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
  const [isUploading] = useState(false);

  useEffect(
    function () {
      if (id) {
        Api.questionnaires.get(id).then((response) => setQuestionnaire(response.data));
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
        await Api.questionnaires.update(id, questionnaire);
      } else {
        await Api.questionnaires.create(questionnaire);
      }
      history.push('/questionnaires');
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
      <h1>{id ? 'Edit' : 'New'} Questionnaire </h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="title">title</label>
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
          <label htmlFor="explanation">explanation</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('explanation') })}
            type="text"
            id="explanation"
            name="explanation"
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
