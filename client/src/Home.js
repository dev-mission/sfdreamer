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
            <b>Contact various resource centers.</b>
            <p>San Francisco provides many resources to help with immigration,</p>
          </div>
        </Link>

        <Link onClick={() => setActive(false)} to="/">
          <div className="category">
            <h3>Employment</h3>
            <b>Find out if you're eligible.</b>
            <p>Take this short survey to see what options are available for you.</p>
          </div>
        </Link>

        <Link onClick={() => setActive(false)} to="/">
          <div className="category">
            <h3>Housing</h3>
            <b>Learn about the application.</b>
            <p>
              Take the mock version of the Dream Act to learn about the forms and questions that you'll be asked in the real application.
            </p>
          </div>
        </Link>

        <Link onClick={() => setActive(false)} to="/">
          <div className="category">
            <h3>Dream Act</h3>
            <b>Find your AB-540 Form.</b>
            <p>Learn about AB-540 and find out which AB-540 form you will need to fill out.</p>
          </div>
        </Link>

        <Link onClick={() => setActive(false)} to="/">
          <div className="category">
            <h3>Financial Aid</h3>
            <b>Find your AB-540 Form.</b>
            <p>Learn about AB-540 and find out which AB-540 form you will need to fill out.</p>
          </div>
        </Link>

        <Link onClick={() => setActive(false)} to="/">
          <div className="category">
            <h3>Immigration</h3>
            <b>Find your AB-540 Form.</b>
            <p>Learn about AB-540 and find out which AB-540 form you will need to fill out.</p>
          </div>
        </Link>
      </div>
    </main>
  );
}

export default Home;
