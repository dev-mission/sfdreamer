import { Link } from 'react-router-dom';

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
      const newForms = forms.filter((r) => r.id !== form.id);
      setForms(newForms);
    }
  }

  return (
    <main className="forms-list">
      <h1>Forms Page</h1>
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
              {form.logo && (
                <>
                  <img className="img-fluid" srcSet={`${form.logoUrl} 2x`} src={form.logoUrl} alt={form.name} />
                  <br />
                </>
              )}
              {form.name}
              <br />
              {form.orgtype}
              <br />
              {form.contactperson}
              <br />
              {form.address}
              <br />
              {form.phone}
              <br />
              {form.email}
              <br />
              {form.website}
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
            <div className="col-sm mb-3">mapa columns</div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default FormsList;

