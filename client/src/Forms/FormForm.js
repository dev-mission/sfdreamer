import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import classNames from 'classnames';

import Api from '../Api';
import PhotoUploader from '../PhotoUploader';
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
        Api.forms.get(id).then((response) => setForm(response.data));
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
        await Api.forms.update(id, form);
      } else {
        await Api.forms.create(form);
      }
      history.push('/forms');
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
          <label className="form-label" htmlFor="logo">
            Logo
          </label>
          <PhotoUploader
            className="card"
            id="logo"
            name="logo"
            value={form.logo}
            valueUrl={form.logoUrl}
            onChange={onChange}
            onUploading={setUploading}>
            <div className="card-body">
              <div className="card-text">Drag-and-drop a photo file here, or click here to browse and select a file.</div>
            </div>
          </PhotoUploader>
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
