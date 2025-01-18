import React, { useState } from 'react';
import { signup } from '../api';
import { useNavigate } from 'react-router-dom';


const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signup({ username, email, password });
            alert('Signup successful!');
            navigate('/login'); // Redirect to the login page
        } catch (err) {
            console.log(err);
            alert('Signup failed!');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '30px', textAlign: 'center' }}>
            <form onSubmit={handleSubmit} className='form-container'>
                <h2>Signup</h2>
                <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
