import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import classNames from 'classnames';

import Api from '../Api';
import UnexpectedError from '../UnexpectedError';
import ValidationError from '../ValidationError';

function ResourceForm() {
  const { id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [resource, setResource] = useState({
    name: '',
    orgtype: '',
    contactperson: '',
    phone: '',
    address: '',
    email: '',
    website: '',
  });

  useEffect(
    function () {
      if (id) {
        Api.resources.get(id).then((response) => setResource(response.data));
      }
    },
    [id]
  );

  function onChange(event) {
    const newResource = { ...resource };
    newResource[event.target.name] = event.target.value;
    setResource(newResource);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      if (id) {
        await Api.resources.update(id, resource);
      } else {
        await Api.resources.create(resource);
      }
      history.push('/resources');
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
      <h1>{id ? 'Edit' : 'New'} Resource</h1>
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
            value={resource.name}
          />
          {error?.errorMessagesHTMLFor?.('name')}
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
            value={resource.orgtype}
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
            value={resource.contactperson}
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
            value={resource.phone}
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
            value={resource.address}
          />
          {error?.errorMessagesHTMLFor?.('address')}
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email:</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('email') })}
            type="text"
            id="email"
            name="email"
            onChange={onChange}
            value={resource.email}
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
            value={resource.website}
          />
          {error?.errorMessagesHTMLFor?.('website')}
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
export default ResourceForm;
