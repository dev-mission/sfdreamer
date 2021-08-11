import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';

import './CategoriesList.scss';
import { useAuthContext } from '../AuthContext';
import { useEffect, useState } from 'react';
import Api from '../Api';

function CategoriesList() {
  const { user } = useAuthContext();
  const { slug } = useParams();
  const [category, setCategory] = useState([]);

  useEffect(
    function () {
      if (slug) {
        Api.categories.getSlug(slug).then((response) => setCategory(response.data));
      }
    },
    [slug]
  );

  return (
    <main>
      <h1>hello</h1>
      {category}
    </main>
    // <main className="categories-list">
    //   <h1>Categories {slug ? 'Resources' : 'Page'}</h1>
    //   <div className="container">
    //     {user && (
    //       <div className="mb-3">
    //         <Link className="btn btn-primary" to="/categories/new">
    //           New Category
    //         </Link>
    //       </div>
    //     )}
    //     {categories.map((category) => (
    //       <div key={category.id} className="row">
    //         <div className="col-sm mb-3">
    //           {category.name}
    //           <br />
    //           {category.slug}
    //           <Link className="btn btn-sm btn-primary me-3" to={`/categories/${category.slug}`}>
    //             Resources
    //           </Link>
    //           <br />
    //           {category.summary}
    //           <br />
    //           <img src={category.iconUrl} alt={category.name} />
    //           <br />
    //           {user && (
    //             <div className="mt-1">
    //               <Link className="btn btn-sm btn-primary me-3" to={`/categories/${category.id}/edit`}>
    //                 Edit
    //               </Link>
    //               <button onClick={() => onDelete(category)} className="btn btn-sm btn-danger">
    //                 Delete
    //               </button>
    //             </div>
    //           )}
    //           <hr />
    //         </div>
    //         <div className="col-sm mb-3"></div>
    //       </div>
    //     ))}
    //   </div>
    // </main>
  );
}

export default CategoriesList;
