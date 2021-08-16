import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import classNames from 'classnames';

import Api from '../Api';
import PhotoUploader from '../PhotoUploader';
import UnexpectedError from '../UnexpectedError';
import ValidationError from '../ValidationError';

function ResourceForm() {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [resource, setResource] = useState({
    CategoryId: query.get('CategoryId') || '',
    name: '',
    orgtype: '',
    contactperson: '',
    phone: '',
    address: '',
    lat: '',
    lng: '',
    email: '',
    website: '',
    logo: '',
    descriptivenote: '',
  });
  const [isUploading, setUploading] = useState(false);

  useEffect(
    function () {
      Api.categories
        .index()
        .then((response) => {
          setCategories(response.data);
          if (id) {
            return Api.resources.get(id);
          }
        })
        .then((response) => {
          if (response) {
            setResource(response.data);
          }
        });
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
          <label htmlFor="CategoryId">Category</label>
          <select
            className={classNames('form-select', { 'is-invalid': error?.errorsFor?.('CategoryId') })}
            id="CategoryId"
            name="CategoryId"
            required
            onChange={onChange}
            value={resource.CategoryId}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {error?.errorMessagesHTMLFor?.('proQuestionnaireId')}
        </div>
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
          <label className="form-label" htmlFor="logo">
            Logo
          </label>
          <PhotoUploader
            className="card"
            id="logo"
            name="logo"
            value={resource.logo}
            valueUrl={resource.logoUrl}
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
          <textarea
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
          <label htmlFor="lat">Latitude:</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('lat') })}
            type="text"
            id="lat"
            name="lat"
            onChange={onChange}
            value={resource.lat}
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
            value={resource.lng}
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
        <div className="mb-3">
          <label htmlFor="descriptive-note">Descriptive Note:</label>
          <textarea
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('descriptive-note') })}
            type="text"
            id="descriptive-note"
            name="descriptive-note"
            onChange={onChange}
            value={resource.descriptivenote}
          />
          {error?.errorMessagesHTMLFor?.('descriptive-note')}
        </div>
        <button disabled={isUploading} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
export default ResourceForm;
