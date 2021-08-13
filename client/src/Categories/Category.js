import { useParams } from 'react-router-dom';
import './Category.scss';

import { useEffect, useState } from 'react';
import Api from '../Api';

function Category() {
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
    <main className="category">
      <h1>{category.name}</h1>
      <div className="container">
        <div className="row resources">
          {resources.map((resource) => (
            <div key={resource.id} className="resource col-md-4 mb-1 d-flex flex-column">
              <div class="row flex-grow-1">
                <div className="col-8">
                  {resource.logoUrl && (
                    <>
                      <img className="mb-2 resource__logo" src={resource.logoUrl} alt={resource.name} />
                      <br />
                    </>
                  )}
                  {resource.name && (
                    <>
                      {resource.name}
                      <br />
                    </>
                  )}
                  {resource.phone && (
                    <>
                      {resource.phone}
                      <br />
                    </>
                  )}
                  {resource.email && (
                    <>
                      {resource.email}
                      <br />
                    </>
                  )}
                  {resource.website && (
                    <>
                      <a href={resource.website} target="_blank" rel="noreferrer">
                        {resource.website}
                      </a>
                    </>
                  )}
                </div>
                <div className="col-4"></div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Category;
