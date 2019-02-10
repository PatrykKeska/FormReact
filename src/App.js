import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {

    username: '',
    email: '',
    password: '',
    checked: false,
    submitted: false,
    message: ' ',


    errors: {
      username: false,
      email: false,
      password: false,
      checked: false,
    },
  }

  messages = {
    username_incorrect: "name has to contain minimum  8 characters",
    email_incorrect: "email has to contain @",
    password_incorrect: "password has to be longer than 6 characters ",
    checked_incorrect: "checked is not confirmed ",
  }

  handleChange = (e) => {

    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;

    if (type === "text" || type === "email" || type === "password") {
      this.setState({
        [name]: value
      })

    } else if (type === "checkbox") {
      const checked = e.target.checked
      this.setState({
        [name]: checked,
      })
    }
  }
  handleSumbit = (e) => {
    e.preventDefault();
    const validate = this.handleValidate();

    if (validate.validationCorrect) {
      this.setState({
        username: '',
        email: '',
        password: '',
        checked: false,
        message: "form has been successfully submitted. thank you",
        submitted: true,

        errors: {
          username: false,
          email: false,
          password: false,
          checked: false,
        },
      })


    } else {
      this.setState({
        errors: {
          username: !validate.username,
          email: !validate.email,
          password: !validate.password,
          checked: !validate.checked,
        },
      })

    }
  }

  handleValidate = () => {
    let username = false;
    let email = false;
    let password = false;
    let checked = false;
    let validationCorrect = false;

    if (this.state.username.length >= 8 && this.state.username.indexOf(' ') === -1) {
      username = true;
    }

    if (this.state.email.indexOf('@') !== -1) {
      email = true;
    }

    if (this.state.password.length >= 6 && this.state.password.indexOf(' ') === -1) {
      password = true;
    }

    if (this.state.checked) {
      checked = true;
    }

    if (username && email && password && checked) {
      validationCorrect = true;
    }
    return ({
      username,
      email,
      password,
      checked,
      validationCorrect,
    })

  }


  handleClose = () => {
    this.setState({
      submitted: false,
    })
  }


  componentDidUpdate() {
    if (this.state.message !== ' ') {
      setTimeout(() => this.setState({
        message: ' ',
        submitted: false,
      }), 3000)
    }
  }

  render() {

    const { username, email, password, checked } = this.state.errors;


    return (
      <div className="App">
        <form onSubmit={this.handleSumbit}>
          <label htmlFor="user">Name:
            <input type="text" id="user" name="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          {username && <span>{this.messages.username_incorrect}</span>}



          <label htmlFor="email">Email adress:
            <input noValidate type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          {email && <span>{this.messages.email_incorrect}</span>}



          <label htmlFor="password">Password:
            <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          {password && <span>{this.messages.password_incorrect}</span>}

          <label htmlFor="checkbox">
            <input type="checkbox" id="checkbox" name="checked" checked={this.state.checked} value={this.state.checked} onChange={this.handleChange} />Confirm that you accept terms and conditions</label>
          {checked && <span>{this.messages.checked_incorrect}</span>}
          <button >Send</button>
        </form>

        {this.state.submitted && <div className="successForm">
          <h1>{this.state.message}</h1>
          <button onClick={this.handleClose}>Close</button>
        </div>}
      </div>

    );
  }
}

export default App;
