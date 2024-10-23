import React, { useEffect, useState } from 'react'
import { filterData } from '../../helper/filterData';
import { requireField } from '../../helper/util';
import { gql, useMutation } from '@apollo/client';
import { addUpdateMututation } from '../../helper/gql';

export const AddModal = ({refetch, editData, setEditData}) => {
    const mutattion = gql(addUpdateMututation())
    const [addItem] = useMutation(mutattion)

    const [formData, setFormData] = useState(() => {
        const initialData = {};
        filterData.forEach(item => {
          initialData[item.option] = ''; // Initialize each input field value as empty
        });
        console.log('addmodeal', editData)
        if(Object.keys(editData)!==0) return editData;
        return initialData;
      });
      
    useEffect(() => {
        if (Object.keys(editData).length !== 0) {
        setFormData(editData); // Update formData with editData if it's not empty
        } else {
        // Reset to filterData if editData is empty
        const initialData = {};
        filterData.forEach(item => {
            initialData[item.option] = ''; // Initialize each input field value as empty
        });
        setFormData(initialData);
        }
    }, [editData]); // Run this effect when editData changes

    function handleInputChange(e) {
        const { id, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [id]: value, // Update state dynamically based on input field
        }));
    }
    function handleClose(){
        console.log(editData)
        setEditData({});
        setFormData(() => {
            const resetData = {};
            filterData.forEach(item => {
                resetData[item.option] = ''; // Reset each input field value
                document.getElementById(item.option).classList.remove('is-valid', 'is-invalid'); // Remove validation styles
            });
            return resetData;
          });
    }
    
    async function handleSave(event){
        let isValid = true;
        filterData.forEach((e)=>{
            const element = document.getElementById(e.option);
            const value = formData[e.option]; // Get the value from the state
            if(requireField.includes(e.option) && !value){
                isValid = false;
                element.classList.add('is-invalid')
            }
            else if(requireField.includes(e.option) && value){
                element.classList.remove('is-invalid')
                element.classList.add('is-valid')
            }
        })
        debugger;     
        if(!isValid)   
        event.preventDefault();
        else{   
            try{
                    if(Object.keys(formData).includes('__typename'))   delete formData['__typename'];
                    if(Object.keys(formData).includes('numericId'))   delete formData['numericId'];

                    await addItem({ variables:{"item":formData} })
                    console.log(formData);
                    refetch()
                    window.alert('data saved successfully');
                }
                catch(err){
                    console.error(err);
                }
              // here i want to hide the modal after 1 sec
              setTimeout(() => {
                    handleClose(); // Reset input fields
                    window.bootstrap.Modal.getInstance(document.getElementById('exampleModal')).hide();
            }, 500);

        }
    }
    // is-invalid  is-valid
  return (
    <div className="modal fade"  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content" style={{backgroundColor:"#282828"}}>
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Data</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
            </div>
                    <div className="modal-body">
                        {filterData.map((item, index)=>{
                            return (
                                <div className="mb-3 row" key={index}>
                                    <label htmlFor={item.option} className="col-sm-2 col-form-label">{item.label}:</label>
                                    <div className="col-sm-10">
                                    <input  type={item.option==="EnqDate"?"date":"text"} className="form-control" id={item.option}
                                        value={formData[item.option]} // Bind to state
                                        onChange={handleInputChange} // Update state on change
                                    />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                        <button type="submit" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                    </div>
            </div>
        </div>
    </div>
  )
}
