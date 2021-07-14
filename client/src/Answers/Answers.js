import { useRouteMatch, Route, Switch } from 'react-router-dom';

import { AuthProtectedRoute } from '../AuthContext';
import AnswersList from './AnswersList';
import AnswerForm from './AnswerForm';

function Answers() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <AnswersList />
      </Route>
      <AuthProtectedRoute path={`${path}/new`}>
        <AnswerForm />
      </AuthProtectedRoute>
      <AuthProtectedRoute path={`${path}/:id/edit`}>
        <AnswerForm />
      </AuthProtectedRoute>
    </Switch>
  );
}

export default Answers;
