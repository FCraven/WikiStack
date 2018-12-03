const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">

    <div class="form-group">
      <label for="author-name" class="col-sm-2 control-label">Author Name</label>
      <div class="col-sm-10">
        <input placeholder='Enter Your Name Here...' id="author-name" name='name' type='text' class='form-control' />
      </div>
    </div>

    <div class='form-group'>
      <label for="author-email" class='col-sm-2 control-label'>Author Email</label>
      <div class='col-sm-10'>
        <input placeholder='Enter Your Email Address...' id='author-email' name='email' type='text' class='form-control' />
      </div>
    </div>

    <div class="form-group">
      <label for="title" class='col-sm-2 control-label'>Page Title</label>
      <div class="col-sm-10">
        <input placeholder='Enter the Title of the Page...' id="title" name="title" type="text" class="form-control" />
      </div>
    </div>

    <div class='form-group'>
      <label for='page-content' class='col-sm-2 control-label'>Page Content</label>
      <div class='col-sm-10'>
        <textarea placeholder='Enter Content Here...' id='page-content' name='content' type='text' class='form-control'></textarea>
      </div>
    </div>

    <div class='form-group'>
      <label for='page-status' class='col-sm-2 conrol-label'>Page Status</label>
      <div class='col-sm-10'>
        <input type='radio' name='status' value='open'>Open<br>
        <input type='radio' name='status' value='closed'>Closed<br>
      </div>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>

  </form>
`);
