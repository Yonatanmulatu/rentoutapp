import React from 'react';
import Axios from 'axios';



class RegistrationForm extends React.Component {

    state = {
        username: '',
        password:'',
        confirmPassword:'',
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = () => {
        let error = false;
        if(this.state.username.trim() === '' || this.state.password.trim() === '' || this.state.confirmPassword.trim() ==='') {
            error = true;
        }
        if(this.state.password !== this.state.confirmPassword) {
            error = true;
        }
        if(error) {
            alert('there is an error');
        } else {
            let newUser = {
                username: this.state.username,
                password: this.state.password
            }
            Axios.post('http://localhost:8080/users/', newUser)
            alert("registered")
        }
    }
    
    render() {
        return(
            <div>
                Username: <input type='text' onChange={this.inputChangeHandler} value={this.state.name} name='username'/>
                Password: <input type='password' onChange={this.inputChangeHandler} value={this.state.name} name='password'/>
                Confirm Password: <input type='password' onChange={this.inputChangeHandler} value={this.state.name} name='confirmPassword'/>
                <button onClick={this.register}>Register</button>
            </div>
        )
    }
}

export default RegistrationForm;