import { Link } from 'react-router-dom';

import './FormsList.scss';
import { useAuthContext } from '../AuthContext';
import { useEffect, useState } from 'react';
import Api from '../Api';

function FormsList() {
  const { user } = useAuthContext();
  const [forms, setForms] = useState([]);

  useEffect(function () {
    Api.forms.index().then((response) => setForms(response.data));
  }, []);

  async function onDelete(form) {
    if (window.confirm(`Are you sure you wish to delete "${form.name}"?`)) {
      await Api.forms.delete(form.id);
      const newform = forms.filter((r) => r.id !== form.id);
      setForms(newform);
    }
  }

  return (
    <main className="form-list">
      <h1>Forms</h1>
      <div className="container">
        {user && (
          <div className="mb-3">
            <Link className="btn btn-primary" to="/forms/new">
              New Form
            </Link>
          </div>
        )}
        {forms.map((form) => (
          <div key={form.id} className="row">
            <div className="col-sm mb-3">
              {form.name}
              <br />
              <img src={form.logoUrl} alt={form.name} />
              <br />
              {form.year}
              <br />
              {form.school}
              <br />
              {form.url}
              <br />
              {form.lang}
              <br />
              {user && (
                <div className="mt-1">
                  <Link className="btn btn-sm btn-primary me-3" to={`/forms/${form.id}/edit`}>
                    Edit
                  </Link>
                  <button onClick={() => onDelete(form)} className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="col-sm mb-3"></div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default FormsList;
