import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import Api from './Api';

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(function () {
    Api.categories.index().then((response) => setCategories(response.data));
  }, []);

  return (
    <main className="home">
      <div className="Welcome">
        <h1>
          Welcome <span className="d-none d-md-inline">to SF Dreamer</span>
        </h1>
        <h2>SFDreamer is amazing!</h2>
      </div>

      <div className="container">
        <div className="row">
          {categories.map((category) => (
            <Link to={`/categories/${category.slug}`} className="category col-md-4">
              <div className="category__card">
                <h3>{category.name}</h3>
                <p>{category.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
