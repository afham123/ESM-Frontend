import React, { useState } from 'react'
import Papa from 'papaparse';
import BasicTable from '../table';
import {  requireField, uploadFields } from '../../helper/util';
import { uploadItemsMutation } from '../../helper/gql';
import { gql, useMutation } from '@apollo/client';

export const Uploadmodal = ({refetch}) => {
  const uploadmutattion = gql(uploadItemsMutation())
  const [uploadItems] = useMutation(uploadmutattion);


    const [uploadData, setUploadData] = useState([]);
    function handlePreview(){
        const csvFileInput = document.getElementById('csvFileInput');
        const file = csvFileInput.files[0];
      
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const text = e.target.result;
                Papa.parse(text, {
                header: true,
                complete: function (results) {
                    // console.log('json result',results.data);    // Log the JSON output
                    setUploadData(results.data)
                },
                });
            };
            reader.readAsText(file);
        } else {
          window.alert('No file selected.');
        }
      };
      function handleClear(){
        document.getElementById('csvFileInput').value = ''
        setUploadData([])
      }
    async function handleUpload(){
        // console.log(uploadData);
        let msg='';
        if(uploadData.length===0) {
            window.alert('Please select data first');
            return;
        }
        const keysCount = Object.keys(uploadData[0]).length;
        Object.keys(uploadData[0]).forEach((key)=>{
            if(!uploadFields.includes(key))
                msg = `Data contain invalid field '${key}'. \n\nExpected fields :\n${uploadFields.join(", ")}`;
        })
        if(msg!==''){
            window.alert(msg)
            return;
        }
        const formatData = []
        uploadData.forEach((row)=>{
            debugger;
            const keys = Object.keys(row) 
            if(keys.length!==keysCount) return;           
            if(requireField.some(e=>!keys.includes(e))){
                const req = requireField.filter(e=>!keys.includes(e)).join(", ")
                msg = `Data: doesn't contain required fields: ${req}`
            }
            else{
                formatData.push(row)
            }
        })
        if(msg!==''){
            window.alert(msg)
            return;
        }
        try{
          await uploadItems({
            variables : { items : formatData}
          })
          refetch()
          window.alert('Items uplpoaded successfully');
        }
        catch(err){
          window.alert(err.message);
        }
        //formatData upload gql
    }
  return (
    <div className="modal"  id="uploadModal" tabIndex="-1">
  <div className="modal-dialog  modal-lg modal-dialog-scrollable" style={{color:'black'}}>
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" >Upload Data</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <input type="file" id="csvFileInput" accept=".csv"/>
        <button id="uploadButton" onClick={handlePreview}>Prev Data</button>
        {uploadData.length!==0 && 
        <div> 
            <h5 className='mt-3 mb-1'>Data Preview</h5>
             <BasicTable data={uploadData}/>
        </div>
       }
      </div>
      <div className="modal-footer">
        <button type="button" className="btn" onClick={handleClear}>
        <i className="fa-solid fa-trash"></i> clear Data
        </button>
        <button type="button" className="btn" onClick={handleUpload}>
        <i className="fa-solid fa-cloud-arrow-up"></i> Upload Data
        </button>
        <button type="button" className="btn " data-bs-dismiss="modal"><i className="fa-solid fa-close"></i> Close</button>
      </div>
    </div>
  </div>
</div>
  )
}
