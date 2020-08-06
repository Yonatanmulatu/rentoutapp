import React from 'react';
import Axios from 'axios';


class LoginForm extends React.Component {

    state = {
        username: '',
        password:'',
        errorMessage: '',
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = () => {
        let error = false;
        if(this.state.username.trim() === '' || this.state.password.trim() === '') {
            error = true;
        }
        if(error) {
            alert('there is an error');
        } else {
            let user = {
                username: this.state.username,
                password: this.state.password
            }
            Axios.post('http://localhost:8080/login/', user)
            .then(res => {
                if(res.data._id) {
                    localStorage.setItem('userData', JSON.stringify(user))
                    this.props.loginFn(user);
                        alert("logged in")
                } else {
                    this.props.errorMessageFn();
                }
              })
        }
    }
    
    render() {
        return(
            <div>
                Username: <input type='text' onChange={this.inputChangeHandler} value={this.state.name} name='username'/>
                Password: <input type='password' onChange={this.inputChangeHandler} value={this.state.name} name='password'/>
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}

export default LoginForm;