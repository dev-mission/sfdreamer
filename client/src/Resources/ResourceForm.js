function ResourceForm() {
  return (
    <main className="container">
      <h1>Resource</h1>
      <form method="post" action="/resources">
        <div className="mb-3">
          <label for="name">Name:</label>
          <input className="form-control" type="text" id="name" name="name" required />
        </div>
        <div className="mb-3">
          <label for="orgtype">Type of organization:</label>
          <input className="form-control" type="text" id="orgtype" name="orgtype" required />
        </div>
        <div className="mb-3">
          <label for="contactperson">Contact Person:</label>
          <input className="form-control" type="text" id="contactperson" name="contactperson" />
        </div>
        <div className="mb-3">
          <label for="phone">Phone Number:</label>
          <input className="form-control" type="text" id="phone" name="phone" />
        </div>
        <div className="mb-3">
          <label for="address">Address:</label>
          <input className="form-control" type="text" id="address" name="address" />
        </div>
        <div className="mb-3">
          <label for="email">Email:</label>
          <input className="form-control" type="text" id="email" name="email" />
        </div>
        <div className="mb-3">
          <label for="website">Buisness Website:</label>
          <input className="form-control" type="text" id="website" name="website" />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
export default ResourceForm;
