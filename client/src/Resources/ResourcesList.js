import { Link } from 'react-router-dom';

import './ResourcesList.scss';
import { useAuthContext } from '../AuthContext';

function FormsList() {
  const { user } = useAuthContext();

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
          <div className="col-sm"></div>
          <div className="col-sm">mapa columns</div>
        </div>
      </div>
    </main>
  );
}

export default FormsList;
