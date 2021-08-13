import { useRouteMatch, Route, Switch } from 'react-router-dom';

import { AuthProtectedRoute } from '../AuthContext';
import CategoriesList from './CategoriesList';
import CategoryForm from './CategoryForm';
import Category from './Category';

function Categories() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <CategoriesList />
      </Route>
      <AuthProtectedRoute path={`${path}/new`}>
        <CategoryForm />
      </AuthProtectedRoute>
      <AuthProtectedRoute path={`${path}/:id/edit`}>
        <CategoryForm />
      </AuthProtectedRoute>
      <Route path={`${path}/:slug`}>
        <Category />
      </Route>
    </Switch>
  );
}

export default Categories;
