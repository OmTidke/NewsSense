import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/Login.css";
import axios from 'axios';


function Login(props) {
    const [isLoginVisible, setLoginVisible] = useState(true);

    const navigate = useNavigate();

    const toggleCard = () => {
        setLoginVisible(!isLoginVisible);
    };

    // declare states for registeration form 
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [mesg, setMesg] = useState('');

    // declare handleSignUpSubmit
    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4001/register', {firstName, lastName, email, password})
        .then(result => {
            console.log(result);
            alert(result.data);
            setMesg(result.data)})
        .catch(err => console.log(err));
    }


    // declare state variable for login page
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');


    // function to handle login form
    const handleLogInSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4001/login', {loginEmail, loginPassword})
        .then(result => {
            console.log(result);
            alert(result.data);
            navigate('/');
            navigate(0)
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-image-login">
            <div className={`card card-login p-4 ${isLoginVisible ? '' : 'd-none'}`}>
                <h2 className="text-center blue">Welcome Back . . .</h2>
                <p className="text-center">Sign In to continue</p>
                <form onSubmit={handleLogInSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Email</label>
                        <input type="email" id="username" className="form-control" placeholder="Enter your username" required
                        onChange={(e) => setLoginEmail(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" className="form-control" placeholder="Enter your password" required
                        onChange={(e) => setLoginPassword(e.target.value)}/>
                    </div>

                    <div className='mb-3 center-button'>
                        <button type="submit" className="btn btn-dark login-button">Login</button>
                    </div>
                </form>

                <div className="mt-3 text-center">
                    Don't have an account? <Link to="/login" onClick={toggleCard}>Register here</Link>
                </div>
            </div>

            {/* register page */}
            <div className={`card card-login p-4 ${isLoginVisible ? 'd-none' : ''}`}>
                <h2 className="text-center blue">Create your account</h2>
                <p className="text-center">it's just few minutes and free</p>
                <form onSubmit={handleSignUpSubmit}>
                    <div className="mb-3">
                        <div class="row">
                            <div class="col">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" class="form-control" placeholder="Enter your first name" aria-label="First name" required 
                                onChange={(e) =>setFirstName(e.target.value)}/>
                            </div>
                            <div class="col">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" class="form-control" placeholder="Enter your last name" aria-label="Last name" required 
                                onChange={(e) =>setLastName(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" className="form-control" placeholder="Enter your email" required 
                        onChange={(e) =>setEmail(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="new-password" className="form-control" placeholder="Enter your new password" required
                        onChange={(e) =>setPassword(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" id="c-password" className="form-control" placeholder="Confirm your password" required/>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck" required/>
                        <label class="form-check-label" for="gridCheck">
                            Agree Terms and Conditions
                        </label>
                    </div>

                    <div className="text-center">
                        {mesg}
                    </div>
                    <div className='mb-3 center-button my-1'>
                        <button type="submit" className="btn btn-dark login-button">Register</button>
                    </div>
                </form>

                <div className="mt-3 text-center">
                    Already have an account? <Link to="/login" onClick={toggleCard}>Login here</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
