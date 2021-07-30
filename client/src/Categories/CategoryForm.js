import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import classNames from 'classnames';

import Api from '../Api';
import PhotoUploader from '../PhotoUploader';
import UnexpectedError from '../UnexpectedError';
import ValidationError from '../ValidationError';

function CategoryForm() {
  const { id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [category, setCategory] = useState({
    name: '',
    summary: '',
    icon: '',
  });
  const [isUploading, setUploading] = useState(false);

  useEffect(
    function () {
      if (id) {
        Api.categories.get(id).then((response) => setCategory(response.data));
      }
    },
    [id]
  );

  function onChange(event) {
    const newCategory = { ...category };
    newCategory[event.target.name] = event.target.value;
    setCategory(newCategory);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      if (id) {
        await Api.categories.update(id, category);
      } else {
        await Api.categories.create(category);
      }
      history.push('/categories');
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
      <h1>{id ? 'Edit' : 'New'} category</h1>
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
            value={category.name}
          />
          {error?.errorMessagesHTMLFor?.('name')}
        </div>
        <div className="mb-3">
          <label htmlFor="summary">Summary:</label>
          <input
            className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('summary') })}
            type="text"
            id="summary"
            name="summary"
            required
            onChange={onChange}
            value={category.summary}
          />
          {error?.errorMessagesHTMLFor?.('summary')}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="icon">
            Icon
          </label>
          <PhotoUploader
            className="card"
            id="icon"
            name="icon"
            value={category.icon}
            valueUrl={category.iconUrl}
            onChange={onChange}
            onUploading={setUploading}>
            <div className="card-body">
              <div className="card-text">Drag-and-drop a photo file here, or click here to browse and select a file.</div>
            </div>
          </PhotoUploader>
          {error?.errorMessagesHTMLFor?.('icon')}
        </div>
        <button disabled={isUploading} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
export default CategoryForm;
