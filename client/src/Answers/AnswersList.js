import { Link } from 'react-router-dom';

// import './ResourcesList.scss';
import { useAuthContext } from '../AuthContext';
import { useEffect, useState } from 'react';
import Api from '../Api';

function AnswersList() {
  const { user } = useAuthContext();
  const [answers, setAnswers] = useState([]);

  useEffect(function () {
    Api.answers.index().then((response) => setAnswers(response.data));
  }, []);

  async function onDelete(answer) {
    if (window.confirm(`Are you sure you wish to delete "${answer.title}"?`)) {
      await Api.answers.delete(answer.id);
      const newAnswers = answers.filter((r) => r.id !== answer.id);
      setAnswers(newAnswers);
    }
  }

  return (
    <main className="answers-list">
      <h1>answers Page</h1>
      <div className="container">
        {user && (
          <div className="mb-3">
            <Link className="btn btn-primary" to="/answers/new">
              New Answer
            </Link>
          </div>
        )}
        {answers.map((answer) => (
          <div key={answer.id} className="row">
            <div className="col-sm mb-3">
              {answer.value}
              <br />
              {user && (
                <div className="mt-1">
                  <Link className="btn btn-sm btn-primary me-3" to={`/answers/${answer.id}/edit`}>
                    Edit
                  </Link>
                  <button onClick={() => onDelete(answer)} className="btn btn-sm btn-danger">
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

export default AnswersList;
