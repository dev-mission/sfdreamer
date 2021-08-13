import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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
        Api.resources.index(category.id).then((response) => setResources(response.data));
      }
    },
    [slug]
  );

  return (
    <main className="categories-list">
      <h1>{category.name}</h1>
      <div className="container"></div>
      {resources.map(
        (resource) =>
          resource.CategoryId === category.id && (
            <Link className="btn btn-sm btn-primary me-3" to={`/resources/${resource.id}/edit`}>
              {resource.name}
            </Link>
          )
      )}
    </main>
  );
}

export default CategoriesSources;
