import { useRouteMatch, Route, Switch } from 'react-router-dom';

import { AuthProtectedRoute } from '../AuthContext';
import CategoriesList from './CategoriesList';
import CategoryForm from './CategoryForm';
import CategoriesSources from './CategoriesSources';

function Categories() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <CategoriesList />
      </Route>
      <Route path={`${path}/:slug/resources`}>
        <CategoriesSources />
      </Route>
      <AuthProtectedRoute path={`${path}/new`}>
        <CategoryForm />
      </AuthProtectedRoute>
      <AuthProtectedRoute path={`${path}/:id/edit`}>
        <CategoryForm />
      </AuthProtectedRoute>
    </Switch>
  );
}

export default Categories;
