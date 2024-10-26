import React, { useEffect, useState } from 'react';
import '../css/login.css'
import { captchaValue, initCaptcha } from './captch';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('Component has mounted');
        initCaptcha()
    }, []);

    const handleLogin = () => {
        let inputcaptchavalue = document.getElementById("captcha_form").value;
        if (inputcaptchavalue === captchaValue) {
                // swal("","Log in","success");
                alert("Log in success");
                if (!username || !password) {
                    setError('Username and password are required');
                    return;
                }
                // Here you would normally call an API to verify credentials
                if (username === 'user' && password === 'pass') {
                    navigate('/table');
                } else {
                    setError('Invalid username or password');
                }
            }
        else{
                // swal("Invalid Captcha");
            setError("Invalid Captcha");
        }
    };
    

    return (
        <div className="login-page" >
            <div className="login-form">
                <h2 className='text-center form_title'>Login</h2>
            
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="form_div">
                    {/* <label htmlFor="username">Username:</label> */}
                    <input
                        type="text"
                        id="username"
                        className="form_input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder=" "
                    />
                    <label className="form_label">Email</label>
                </div>
                <div className="form_div">
                    <input
                        type="password"
                        id="password"
                        className="form_input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=" "
                    />
                    <label className="form_label">Password</label>
                </div>
                <div className="form_div">
                <div id="captcha" className="form_div">
                    <div id="preview"></div>
                    <div className="captcha_form"> 
                        <input type="text" id="captcha_form" className="form_input_captcha" placeholder=" "/>
                        <label className="form_label_captcha">Enter Captcha</label>
                        <button className="captcha_refersh" onClick={()=>{
                            setError('');
                            initCaptcha()
                        }}>
                            <i className="fa fa-refresh"></i>
                        </button>
                    </div>
                </div>
                </div>
                <button type="submit" className="form_button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default LoginPage;
