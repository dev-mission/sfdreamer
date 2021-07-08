import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import classNames from 'classnames';

import Api from '../Api';
import UnexpectedError from '../UnexpectedError';
import ValidationError from '../ValidationError';

function FormForm() {
  const { id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '',
    logo: '',
    year: '',
    school: '',
    url: '',
    lang: '',
  });
  const [isUploading, setUploading] = useState(false);

  useEffect(
    function () {
      if (id) {
        Api.form.get(id).then((response) => setForm(response.data));
      }
    },
    [id]
  );

  function onChange(event) {
    const newForm = { ...form };
    newForm[event.target.name] = event.target.value;
    setForm(newForm);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      if (id) {
        await Api.form.update(id, form);
      } else {
        await Api.form.create(form);
      }
      history.push('/form');
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
      <h1>Form</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Name: </label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('name') })}
            type="text"
            id="name"
            name="name"
            required
            onChange={onChange}
            value={form.name}
          />
          {error?.errorMessagesHTMLFor?.('name')}
        </div>

        <div className="mb-3">
          <label htmlFor="logo">Logo: </label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('logo') })}
            type="text"
            id="logo"
            name="logo"
            required
            onChange={onChange}
            value={form.logo}
          />
          {error?.errorMessagesHTMLFor?.('logo')}
        </div>

        <div className="mb-3">
          <label htmlFor="year">Year: </label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('year') })}
            type="text"
            id="year"
            name="year"
            required
            onChange={onChange}
            value={form.year}
          />
          {error?.errorMessagesHTMLFor?.('year')}
        </div>

        <div className="mb-3">
          <label htmlFor="school">School: </label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('school') })}
            type="text"
            id="school"
            name="school"
            required
            onChange={onChange}
            value={form.school}
          />
          {error?.errorMessagesHTMLFor?.('school')}
        </div>

        <div className="mb-3">
          <label htmlFor="url">URL: </label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('url') })}
            type="text"
            id="url"
            name="url"
            required
            onChange={onChange}
            value={form.url}
          />
          {error?.errorMessagesHTMLFor?.('url')}
        </div>

        <div className="mb-3">
          <label htmlFor="lang">Lang: </label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('lang') })}
            type="text"
            id="lang"
            name="lang"
            required
            onChange={onChange}
            value={form.lang}
          />
          {error?.errorMessagesHTMLFor?.('lang')}
        </div>

        <button disabled={isUploading} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
export default FormForm;
