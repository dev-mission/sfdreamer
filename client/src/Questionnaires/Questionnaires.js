import { useRouteMatch, Route, Switch } from 'react-router-dom';

import { AuthProtectedRoute } from '../AuthContext';
import QuestionnairesList from './QuestionnairesList';
import QuestionnaireForm from './QuestionnaireForm';

function Questionnaires() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <QuestionnairesList />
      </Route>
      <AuthProtectedRoute path={`${path}/new`}>
        <QuestionnaireForm />
      </AuthProtectedRoute>
      <AuthProtectedRoute path={`${path}/:id/edit`}>
        <QuestionnaireForm />
      </AuthProtectedRoute>
    </Switch>
  );
}

export default Questionnaires;
