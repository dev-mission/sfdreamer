import { useRouteMatch, Route, Switch } from 'react-router-dom';

import { AuthProtectedRoute } from '../AuthContext';
import QuestionsList from './QuestionsList';
import QuestionForm from './QuestionForm';

function Questions() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <QuestionsList />
      </Route>
      <AuthProtectedRoute path={`${path}/new`}>
        <QuestionForm />
      </AuthProtectedRoute>
      <AuthProtectedRoute path={`${path}/:id/edit`}>
        <QuestionForm />
      </AuthProtectedRoute>
    </Switch>
  );
}

export default Questions;
