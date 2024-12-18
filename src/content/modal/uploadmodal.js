import React, { useState } from 'react'
import * as XLSX from 'xlsx/dist/xlsx.full.min.js';
// import ExcelJS from 'exceljs';
import BasicTable from '../table';
import {  requireField, uploadFields } from '../../helper/util';
import { uploadItemsMutation } from '../../helper/gql';
import { gql, useMutation } from '@apollo/client';

export const Uploadmodal = ({refetch, isDark}) => {
  const uploadmutattion = gql(uploadItemsMutation())
  const [uploadItems] = useMutation(uploadmutattion);
  const [isUploading, setIsUploading] = useState(false); // State to track the upload status



    const [uploadData, setUploadData] = useState([]);

function handlePreview() {
    const files = document.getElementById('FileInput').files;
    if(files.length === 0 ){
      window.alert('No file selected.')
      return;
    }
    let allJsonData = []; // Initialize an array to hold all the JSON data
    
    Array.from(files).forEach((file, index) => {
      if (file) {
          const reader = new FileReader();
  
          reader.onload = function (e) {
              const binaryString = e.target.result; // Read as binary string
  
              // Parse the binary string as a workbook
              const workbook = XLSX.read(binaryString, { type: 'binary' });
  
              // Get the first sheet
              const firstSheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[firstSheetName];
  
              // Convert worksheet to JSON
              const jsonData = XLSX.utils.sheet_to_json(worksheet);
              const formattedData = jsonData.map(row => {
                // If your date column is 'Date', format it as 'DD-MM-YYYY'
                if (row['EnqDate']) {
                  const dateCell = row['EnqDate'];
                  // Check if the dateCell is a serial number (Excel's internal date format)
                  if (typeof dateCell === 'number') {
                    // Convert the Excel serial number to a proper date object
                    const excelDate = new Date((dateCell - 25569) * 86400 * 1000); // Adjust serial number to Date
                    let formattedDate = excelDate.toLocaleDateString('en-GB'); // Format to 'DD/MM/YYYY'
                    const day = String(excelDate.getDate()).padStart(2, '0'); // Get day and add leading zero if needed
              const month = String(excelDate.getMonth() + 1).padStart(2, '0'); // Get month (0-based, so add 1)
              const year = excelDate.getFullYear(); // Get year

               formattedDate = `${year}-${month}-${day}`; // Combine into 'DD-MM-YYYY' 
              row['EnqDate'] = formattedDate;
                  }
                }
                return row;
              });
              allJsonData = allJsonData.concat(formattedData); 
  
              console.log('Parsed JSON Result:', jsonData);
              // setUploadData(jsonData); // Use your state update logic
              if (index === files.length - 1) {
                setUploadData(allJsonData);
              }
          };
  
          reader.readAsBinaryString(file); // Read as binary string
      } 
    })
}
      function handleClear(){
        document.getElementById('FileInput').value = ''
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
            // debugger;
            const keys = Object.keys(row) 
            if(keys.length!==keysCount) return;           
            if(requireField.some(e=>!keys.includes(e))){
                const req = requireField.filter(e=>!keys.includes(e)).join(", ")
                msg = `Data: doesn't contain required fields: ${req}`
            }
            else{
              if(typeof row.Enq_num=='number') row.Enq_num = row.Enq_num + ''
              if(typeof row.contact_num=='number') row.contact_num = row.contact_num + ''
              
                formatData.push(row)
            }
        })
        if(msg!==''){
            window.alert(msg)
            return;
        }
        try{
          setIsUploading(true); // Set to true when upload starts
          await uploadItems({
            variables : { items : formatData, token:localStorage.getItem('token')}
          })
          refetch()
          window.alert('Items uplpoaded successfully');
        }
        catch(err){
          window.alert(err.message);
        }
        finally {
          // Set to false once the upload is completed (or failed)
          setIsUploading(false);
        }
        //formatData upload gql
    }
  return (
    <div className="modal"  id="uploadModal" tabIndex="-1">
  <div className="modal-dialog  modal-lg modal-dialog-scrollable" style={{color:'black'}}>
    <div className={`modal-content ` + (isDark ? "add-Modal-dark" : "") }>
      <div className="modal-header">
        <h5 className="modal-title" >Upload Data</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <input type="file" id="FileInput" accept=".xlsx" multiple/>
        <button id="uploadButton" onClick={handlePreview}  disabled={isUploading}>Prev Data</button>
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
        <i className="fa-solid fa-cloud-arrow-up"></i>{isUploading ? 'Uploading Data...' : 'Upload Data'}
        </button>
        <button type="button" className="btn " data-bs-dismiss="modal"><i className="fa-solid fa-close"></i> Close</button>
      </div>
    </div>
  </div>
</div>
  )
}
