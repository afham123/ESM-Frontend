import { useMutation } from '@apollo/client';
import React from 'react'
import { deleteItemMutation } from '../../helper/gql';
import { gql } from '@apollo/client';

export const DeleteModal = ({refetch}) => {
    const mutattion = gql(deleteItemMutation())
    const [deleteItems] = useMutation(mutattion);

    async function handleClick(){
        const password = document.getElementById('DeletepasswordInput').value
        const ids = JSON.parse(localStorage.getItem('deleteIds'));
        const token = localStorage.getItem('token')
        let res;
        try {
            res = await deleteItems({ variables: {ids, token, password } })
            if(res.data.deleteItem.msg !=null) throw new Error(res.data.deleteItem.msg);
            window.alert('Selected rows deleted successfully')
            if (res.data.deleteItem.success) {
                refetch()
                window.bootstrap.Modal.getInstance(document.getElementById('delteModal')).hide();
            } else {
                console.log(res);
                window.alert(res.data.deleteItem.msg);
            }
        }
        catch (err) {
            window.alert(err.message);
        }
        
    }
    return (
        <div className="modal fade" id="delteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Enter password to delete</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="password" id="DeletepasswordInput" className="form_input" placeholder=" " />
                        <label className="form_label">Enter the password to delete</label>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handleClick}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}