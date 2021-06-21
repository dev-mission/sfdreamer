import { useRouteMatch, Route, Switch } from 'react-router-dom';

import { AuthProtectedRoute } from '../AuthContext';
import FormsList from './FormsList';
import FormForm from './FormForm';

function Forms() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <FormsList />
      </Route>
      <AuthProtectedRoute path={`${path}/new`}>
        <FormForm />
      </AuthProtectedRoute>
      <AuthProtectedRoute path={`${path}/:id/edit`}>
        <FormForm />
      </AuthProtectedRoute>
    </Switch>
  );
}

export default Forms;
