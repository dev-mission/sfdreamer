import './Home.scss';

function Home() {
  return (
    <main className="home">
      <div className="Welcome">
        <h1>
          Welcome <span className="d-none d-md-inline">to SF Dreamer</span>
        </h1>
        <h2>Welcome to SF Dreamer! Follow the Steps below to learn more about the Dream Act and figure out what to do.</h2>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-3 step">
            <h3>Step 1</h3>
            <b>Learn About the Dream Act.</b>
            <p>
              The California Dream Act allows undocumented people who went to a california High School for 3 years or more, to get financial
              aid from the state.
            </p>
            <a className="btn btn-primary" href="/">
              Learn More
            </a>
          </div>
          <div className="col-md-3 step">
            <h3>Step 2</h3>
            <b>Find out if you're eligible.</b>
            <p>Take this short survey to see what options are available for you.</p>
            <a className="btn btn-primary" href="/questions/1">
              Take Survey
            </a>
          </div>
          <div className="col-md-3 step">
            <h3>Step 3</h3>
            <b>Learn about the application.</b>
            <p>
              Take the mock version of the Dream Act to learn about the forms and questions that you'll be asked in the real application.
            </p>
            <a className="btn btn-primary" href="/">
              Mock App
            </a>
          </div>
          <div className="col-md-3 step">
            <h3>Step 4</h3>
            <b>Find your AB-540 Form.</b>
            <p>Learn about AB-540 and find out which AB-540 form you will need to fill out.</p>
            <a className="btn btn-primary" href="/forms">
              Download Form
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
