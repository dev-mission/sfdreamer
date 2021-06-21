import { useRouteMatch, Route, Switch } from 'react-router-dom';

import { AuthProtectedRoute } from '../AuthContext';
import ResourcesList from './ResourcesList';
import ResourceForm from './ResourceForm';

function Resources() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <ResourcesList />
      </Route>
      <AuthProtectedRoute path={`${path}/new`}>
        <ResourceForm />
      </AuthProtectedRoute>
      <AuthProtectedRoute path={`${path}/:id/edit`}>
        <ResourceForm />
      </AuthProtectedRoute>
    </Switch>
  );
}

export default Resources;
