import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      login: false,
      store: null,
    };
  }
  componentDidMount() {
    this.storeCollector();
  }
  storeCollector = () => {
    let store = JSON.parse(localStorage.getItem("login"));
    this.setState({ store: store });
    if (store && store.login) {
      this.setState({ login: true });
    }
  };
  handleSubmit = () => {
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      body: JSON.stringify(this.state),
    }).then((resp) => {
      resp.json().then((result) => {
        localStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            token: result.token,
          })
        );
        this.setState({ login: true });
        this.storeCollector();
      });
    });
  };
  post = () => {
    let token = "Bearer " + this.state.store.token;
    fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: this.state.post,
    }).then((resp) => {
      resp.json().then((result) => {
        console.warn("result", result);
      });
    });
  };
  render() {
    return (
      <div className="App">
        <h1>JWT Authentication</h1>
        {!this.state.login ? (
          <div>
            <input
              type="text"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <br />
            <br />
            <input
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <br />
            <br />
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        ) : (
          <div>
            <textarea
              onChange={(e) => this.setState({ post: e.target.value })}
            ></textarea>
            <br />
            <br />
            <button onClick={this.post}>Post Data</button>
          </div>
        )}
      </div>
    );
  }
}
export default App;
