import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import classNames from 'classnames';

import Api from '../Api';
import UnexpectedError from '../UnexpectedError';
import ValidationError from '../ValidationError';

function AnswerForm() {
  const { id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState({
    value: '',
  });
  const [isUploading] = useState(false);

  useEffect(
    function () {
      if (id) {
        Api.answers.get(id).then((response) => setAnswer(response.data));
      }
    },
    [id]
  );

  function onChange(event) {
    const newAnswer = { ...answer };
    newAnswer[event.target.name] = event.target.value;
    setAnswer(newAnswer);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      if (id) {
        await Api.answers.update(id, answer);
      } else {
        await Api.answers.create(answer);
      }
      history.push('/answers');
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
      <h1>{id ? 'Edit' : 'New'} Answer</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="value">value:</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('value') })}
            type="text"
            id="value"
            name="value"
            required
            onChange={onChange}
            value={answer.value}
          />
          {error?.errorMessagesHTMLFor?.('value')}
        </div>
        <button disabled={isUploading} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
export default AnswerForm;
