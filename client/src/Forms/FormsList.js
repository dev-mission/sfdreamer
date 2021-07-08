import { Link } from 'react-router-dom';

import './FormList.scss';
import { useAuthContext } from '../AuthContext';
import { useEffect, useState } from 'react';
import Api from '../Api';

function FormList() {
  const { user } = useAuthContext();
  const [form, setForm] = useState([]);

  useEffect(function () {
    Api.form.index().then((response) => setForm(response.data));
  }, []);

  async function onDelete(form) {
    if (window.confirm(`Are you sure you wish to delete "${form.name}"?`)) {
      await Api.form.delete(form.id);
      const newform = form.filter((r) => r.id !== form.id);
      setForm(newform);
    }
  }

  return (
    <main className="form-list">
      <h1>Form Page</h1>
      <div className="container">
        {user && (
          <div className="mb-3">
            <Link className="btn btn-primary" to="/form/new">
              New Form
            </Link>
          </div>
        )}
        {form.map((form) => (
          <div key={form.id} className="row">
            <div className="col-sm mb-3">
              {form.name}
              <br />
              {form.logo}
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
                  <Link className="btn btn-sm btn-primary me-3" to={`/form/${form.id}/edit`}>
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

export default FormList;
