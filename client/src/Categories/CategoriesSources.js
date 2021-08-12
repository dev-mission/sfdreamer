import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import './CategoriesList.scss';
import { useEffect, useState } from 'react';
import Api from '../Api';

function CategoriesList() {
  const { slug } = useParams();
  const [category, setCategory] = useState({});
  // const [resources, setResources] = useState([]);

  useEffect(
    function () {
      if (slug) {
        Api.categories.get(slug).then((response) => setCategory(response.data));
      }
    },
    [slug]
  );

  return (
    <main className="categories-list">
      <h1>{category.name}</h1>
      <div className="container"></div>
    </main>
  );
}

export default CategoriesList;
