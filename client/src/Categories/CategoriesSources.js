import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './CategoriesSources.scss';

import { useEffect, useState } from 'react';
import Api from '../Api';

function CategoriesSources() {
  const { slug } = useParams();
  const [category, setCategory] = useState({});
  const [resources, setResources] = useState([]);

  useEffect(
    function () {
      if (slug) {
        Api.categories.get(slug).then((response) => setCategory(response.data));
        Api.resources.index(slug).then((response) => setResources(response.data));
      }
    },
    [slug]
  );

  return (
    <main className="categories-list">
      <h1>{category.name}</h1>
      <div className="container">
        {resources.map((resource) => (
          <div key={resource.id} className="row">
            <div className="col-sm mb-3">
              {resource.name}
              <br />
              {resource.phone}
              <br />
              {resource.email}
              <br />
              {resource.website}
              <br />
              <img src={resource.logoUrl} alt={resource.name} />
              <br />
              <hr />
            </div>
            <div className="col-sm mb-3"></div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default CategoriesSources;
