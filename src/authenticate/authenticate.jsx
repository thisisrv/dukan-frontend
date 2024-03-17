import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Authenticate() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Check if username and password match some predefined values (demo purposes)
        if (username === 'rventerprises' && password === 'Rishabh@123') {
            setIsLoggedIn(true);
        } else {
            alert('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className="container">
            {isLoggedIn ? (
                <Link to='/dashboard'><button className="btn btn-primary">Dashboard</button></Link>
            ) : (
                <form onSubmit={handleLogin}>
                    <h1 className="my-4 heading">Login</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Authenticate;
