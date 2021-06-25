import { Link } from 'react-router-dom';

// import './ResourcesList.scss';
import { useAuthContext } from '../AuthContext';
import { useEffect, useState } from 'react';
import Api from '../Api';

function QuestionsList() {
  const { user } = useAuthContext();
  const [questions, setQuestions] = useState([]);

  useEffect(function () {
    Api.questions.index().then((response) => setResources(response.data));
  }, []);

  async function onDelete(question) {
    if (window.confirm(`Are you sure you wish to delete "${question.prompt}"?`)) {
      await Api.questions.delete(question.id);
      const newQuestions = questions.filter((r) => r.id !== question.id);
      setQuestions(newQuestions);
    }
  }

  return (
    <main className="questions-list">
      <h1>Question Page</h1>
      <div className="container">
        {user && (
          <div className="mb-3">
            <Link className="btn btn-primary" to="/questions/new">
              New Question
            </Link>
          </div>
        )}
        {questions.map((question) => (
          <div key={question.id} className="row">
            <div className="col-sm mb-3">
              {question.promot}
              <br />
              {question.answer_type}
              <br />
              {question.questionnaire_type}
              <br />
              {question.prompt}
              {user && (
                <div className="mt-1">
                  <Link className="btn btn-sm btn-primary me-3" to={`/questions/${question.id}/edit`}>
                    Edit
                  </Link>
                  <button onClick={() => onDelete(question)} className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="col-sm mb-3">mapa columns</div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default QuestionsList;
