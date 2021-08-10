import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

function Home() {
  const [active, setActive] = useState(false);

  return (
    <main className="home">
      <div className="Welcome">
        <h1>
          Welcome <span className="d-none d-md-inline">to SF Dreamer</span>
        </h1>
        <h2>SFDreamer is amazing!</h2>
      </div>

      <div className="container">
        <Link onClick={() => setActive(false)} to="/resources">
          <div className="category">
            <h3>Resources</h3>
            <p>A list of very helpful resources in the Bay Area.</p>
          </div>
        </Link>

        <Link onClick={() => setActive(false)} to="/">
          <div className="category">
            <h3>Employment</h3>
            <p>Find employment opportunities for immigrants.</p>
          </div>
        </Link>

        <Link onClick={() => setActive(false)} to="/">
          <div className="category">
            <h3>Housing</h3>
            <p>Look for various housing options in your area.</p>
          </div>
        </Link>

        <Link onClick={() => setActive(false)} to="/">
          <div className="category">
            <h3>Dream Act</h3>
            <p>Learn about the Dream Act and if you qualify for it.</p>
          </div>
        </Link>

        <Link onClick={() => setActive(false)} to="/">
          <div className="category">
            <h3>Financial Aid</h3>
            <p>Learn about financial aid for immigrant students.</p>
          </div>
        </Link>

        <Link onClick={() => setActive(false)} to="/">
          <div className="category">
            <h3>Immigration</h3>
            <p>Find out more information about immigrations and your status.</p>
          </div>
        </Link>
      </div>
    </main>
  );
}

export default Home;
