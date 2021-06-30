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
    year:'',
    school:  '',
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
      <h1>{id ? 'Edit' : 'New'} Form</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Name:</label>
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
          <label htmlFor="orgtype">Type of organization:</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('orgtype') })}
            type="text"
            id="orgtype"
            name="orgtype"
            required
            onChange={onChange}
            value={form.orgtype}
          />
          {error?.errorMessagesHTMLFor?.('orgtype')}
        </div>
        <div className="mb-3">
          <label htmlFor="contactperson">Contact Person:</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('contactperson') })}
            type="text"
            id="contactperson"
            name="contactperson"
            onChange={onChange}
            value={form.contactperson}
          />
          {error?.errorMessagesHTMLFor?.('contactperson')}
        </div>
        <div className="mb-3">
          <label htmlFor="phone">Phone Number:</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('phone') })}
            type="text"
            id="phone"
            name="phone"
            onChange={onChange}
            value={form.phone}
          />
          {error?.errorMessagesHTMLFor?.('phone')}
        </div>
        <div className="mb-3">
          <label htmlFor="address">Address:</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('address') })}
            type="text"
            id="address"
            name="address"
            onChange={onChange}
            value={form.address}
          />
          {error?.errorMessagesHTMLFor?.('address')}
        </div>
        <div className="mb-3">
          <label htmlFor="lat">Latitude:</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('lat') })}
            type="text"
            id="lat"
            name="lat"
            onChange={onChange}
            value={form.lat}
          />
          {error?.errorMessagesHTMLFor?.('lat')}
        </div>
        <div className="mb-3">
          <label htmlFor="lng">Longitude:</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('lng') })}
            type="text"
            id="lng"
            name="lng"
            onChange={onChange}
            value={form.lng}
          />
          {error?.errorMessagesHTMLFor?.('lng')}
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email:</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('email') })}
            type="text"
            id="email"
            name="email"
            onChange={onChange}
            value={form.email}
          />
          {error?.errorMessagesHTMLFor?.('email')}
        </div>
        <div className="mb-3">
          <label htmlFor="website">Buisness Website:</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('website') })}
            type="text"
            id="website"
            name="website"
            onChange={onChange}
            value={form.website}
          />
          {error?.errorMessagesHTMLFor?.('website')}
        </div>
        <button disabled={isUploading} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
export default FormForm;
