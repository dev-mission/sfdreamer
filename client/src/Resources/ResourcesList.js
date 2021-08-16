import { Link } from 'react-router-dom';

import './ResourcesList.scss';
import { useAuthContext } from '../AuthContext';
import { useEffect, useState } from 'react';
import Api from '../Api';

function ResourcesList() {
  const { user } = useAuthContext();
  const [resources, setResources] = useState([]);

  useEffect(function () {
    Api.resources.index().then((response) => setResources(response.data));
  }, []);

  async function onDelete(resource) {
    if (window.confirm(`Are you sure you wish to delete "${resource.name}"?`)) {
      await Api.resources.delete(resource.id);
      const newResources = resources.filter((r) => r.id !== resource.id);
      setResources(newResources);
    }
  }

  return (
    <main className="resources-list">
      <h1>Resources Page</h1>
      <div className="container">
        {user && (
          <div className="mb-3">
            <Link className="btn btn-primary" to="/resources/new">
              New Resource
            </Link>
          </div>
        )}
        <div className="row">
          {resources.map((resource) => (
            <Link to={`/resources/${resource.slug}`} className="resource col-md-4">
              <div className="resource__card">
                {resource.logo && (
                  <>
                    <img className="img-fluid" srcSet={`${resource.logoUrl} 2x`} src={resource.logoUrl} alt={resource.name} />
                    <br />
                  </>
                )}
                <h3>{resource.name}</h3>
                <p>{resource.orgtype}</p>
                <p>{resource.contactperson}</p>
                <p>{resource.address}</p>
                <p className="contact-info">{resource.phone}</p>
                <p className="contact-info">{resource.email}</p>
                <p className="contact-info">{resource.website}</p>
                {user && (
                  <div className="mt-1">
                    <Link className="btn btn-sm btn-primary me-3" to={`/resources/${resource.id}/edit`}>
                      Edit
                    </Link>
                    <button onClick={() => onDelete(resource)} className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
        {/* {resources.map((resource) => (
          <div key={resource.id} className="row">
            <div className="col-sm mb-3">
              {resource.logo && (
                <>
                  <img className="img-fluid" srcSet={`${resource.logoUrl} 2x`} src={resource.logoUrl} alt={resource.name} />
                  <br />
                </>
              )}
              {resource.name}
              <br />
              {resource.orgtype}
              <br />
              {resource.contactperson}
              <br />
              {resource.address}
              <br />
              {resource.phone}
              <br />
              {resource.email}
              <br />
              {resource.website}
              {user && (
                <div className="mt-1">
                  <Link className="btn btn-sm btn-primary me-3" to={`/resources/${resource.id}/edit`}>
                    Edit
                  </Link>
                  <button onClick={() => onDelete(resource)} className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))} */}
      </div>
    </main>
  );
}

export default ResourcesList;
