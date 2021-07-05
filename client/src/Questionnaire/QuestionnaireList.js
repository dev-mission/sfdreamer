import { Link } from 'react-router-dom';

import './QuestionnaireList.scss';
import { useAuthContext } from '../AuthContext';
import { useEffect, useState } from 'react';
import Api from '../Api';

function QuestionnaireList() {
  const { user } = useAuthContext();
  const [questionnaire, setQuestionnaire] = useState([]);

  useEffect(function () {
    Api.questionnaire.index().then((response) => setQuestionnaire(response.data));
  }, []);

  async function onDelete(questionnaire) {
    if (window.confirm(`Are you sure you wish to delete "${questionnaire.name}"?`)) {
      await Api.questionnaire.delete(questionnaire.id);
      const newquestionnaire = questionnaire.filter((r) => r.id !== questionnaire.id);
      setQuestionnaire(newquestionnaire);
    }
  }

  return (
    <main className="questionnaire-list">
      <h1>Questionnaire Page</h1>
      <div className="container">
        {user && (
          <div className="mb-3">
            <Link className="btn btn-primary" to="/questionnaire/new">
              New Questionnaire
            </Link>
          </div>
        )}
        {questionnaire.map((questionnaire) => (
          <div key={questionnaire.id} className="row">
            <div className="col-sm mb-3">
              {questionnaire.title}
              <br />
              {questionnaire.explanation}
              <br />
              {user && (
                <div className="mt-1">
                  <Link className="btn btn-sm btn-primary me-3" to={`/questionnaire/${questionnaire.id}/edit`}>
                    Edit
                  </Link>
                  <button onClick={() => onDelete(questionnaire)} className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="col-sm mb-3"></div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default QuestionnaireList;
