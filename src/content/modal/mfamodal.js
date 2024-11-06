import React from 'react'
import { verifyMFA } from '../../helper/applogin';
import { useNavigate } from 'react-router-dom';

export const Mfamodal = ({setError, username, password}) => {
    
    const navigate = useNavigate();
    async function handleClick() {
        const MFA_Code = document.getElementById('MFA_Code').value;
        try{

            const res = await verifyMFA(username, password, MFA_Code);
            if (res.success) {
                // debugger;
                window.bootstrap.Modal.getInstance(document.getElementById('Mfamodal')).hide();
                localStorage.setItem('token', res.data)
                navigate('/table');
            } else {
                setError(res.message);
            }
        }
        catch(err){
            setError(err.message);
        }
    }
    return (
        <div className="modal fade" id="Mfamodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Multi Factor Authentication</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="number" id="MFA_Code" className="form_input" placeholder=" " />
                        <label className="form_label">MFA Code</label>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
