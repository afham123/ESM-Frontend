import React, { useEffect, useState } from 'react';
import '../css/login.css'
import { captchaValue, initCaptcha } from '../helper/captch';
// import { useNavigate } from 'react-router-dom';
import { loginUser } from '../helper/applogin';
import { Mfamodal } from './modal/mfamodal';

const LoginPage = () => {
    // const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('Component has mounted');
        initCaptcha()
    }, []);

    const handleLogin = async () => {
        let inputcaptchavalue = document.getElementById("captcha_form").value;
        if (inputcaptchavalue === captchaValue) {
                // swal("","Log in","success");
                // alert("Log in success");
                if (!username || !password) {
                    setError('Username and password are required');
                    return;
                }
                // Here you would normally call an API to verify credentials
                const res = await loginUser(username, password);
                if (res.success) {
                    // debugger;
                    setTimeout(() => {
                        const modalElement = document.getElementById('Mfamodal');
                        const myModal = new window.bootstrap.Modal(modalElement);
                        myModal.show();
                    }, 500);
                    // localStorage.setItem('token', res.data)
                    // navigate('/table');
                } else {
                    setError(res.message);
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
                <Mfamodal setError={setError} username={username} password={password}/>
            
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
