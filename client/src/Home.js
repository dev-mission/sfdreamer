import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import Api from './Api';

function Home() {
  const [active, setActive] = useState(false);
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
        {categories.map((category) => (
          <Link onClick={() => setActive(false)} to={`/categories/${category.slug}`}>
            <div className="category">
              <h3>{category.name}</h3>
              <br />
              <p>{category.summary}</p>
              <br />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Home;
