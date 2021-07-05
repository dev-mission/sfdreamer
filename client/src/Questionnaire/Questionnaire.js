import { useRouteMatch, Route, Switch } from 'react-router-dom';

import { AuthProtectedRoute } from '../AuthContext';
import QuestionnaireForm from './QuestionnaireForm';
import QuestionnaireList from './QuestionnaireList';

function Questionnaire() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <QuestionnaireList />
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

export default Questionnaire;