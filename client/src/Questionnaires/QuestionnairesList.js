import { Link } from 'react-router-dom';

// import './ResourcesList.scss';
import { useAuthContext } from '../AuthContext';
import { useEffect, useState } from 'react';
import Api from '../Api';

function QuestionnairesList() {
  const { user } = useAuthContext();
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(function () {
    Api.questionnaires.index().then((response) => setQuestionnaires(response.data));
  }, []);

  async function onDelete(questionnaire) {
    if (window.confirm(`Are you sure you wish to delete "${questionnaire.title}"?`)) {
      await Api.questionnaires.delete(questionnaire.id);
      const newQuestionnaires = questionnaires.filter((r) => r.id !== questionnaire.id);
      setQuestionnaires(newQuestionnaires);
    }
  }

  return (
    <main className="questionnaires-list">
      <h1>Questionnaires Page</h1>
      <div className="container">
        {user && (
          <div className="mb-3">
            <Link className="btn btn-primary" to="/questionnaires/new">
              New Questionnaire
            </Link>
          </div>
        )}
        {questionnaires.map((questionnaire) => (
          <div key={questionnaire.id} className="row">
            <div className="col-sm mb-3">
              {questionnaire.title}
              <br />
              {questionnaire.explanation}
              <br />
              {user && (
                <div className="mt-1">
                  <Link className="btn btn-sm btn-primary me-3" to={`/questionnaires/${questionnaire.id}/edit`}>
                    Edit
                  </Link>
                  <Link className="btn btn-sm btn-primary me-3" to={`/questionnaires/${questionnaire.id}/questions`}>
                    Questions
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

export default QuestionnairesList;
