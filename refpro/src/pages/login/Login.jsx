import React from 'react'
import { Link } from 'react-router-dom'

// import './login.css' 
import "../../Style/login.scss"


export default function Login() {
    return (
        <div className="text-center m-5-auto">
            <h2>Acenet</h2>
            <form action="/home">
                <p>
                    <label>Email address</label><br/>
                    <input type="text" name="first_name" required />
                </p>
                <br></br>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" name="password" required />
                </p>
                <br></br>

                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}