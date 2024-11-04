import React, { useState } from 'react'

export const AdvancefilterModal = ({isDark, setadvanceQuery, setsearchQuery}) => {
    const [matchPhrase, setMatchPhrase] = useState(localStorage.getItem('matchPhrase')||'');
    const [company, setCompany] = useState(localStorage.getItem('company')||'');
    const [name, setName] = useState(localStorage.getItem('name')||'');
    function handleApplyFilter(){
        console.log({ matchPhrase, company, name });
        localStorage.setItem('name',name)
        localStorage.setItem('matchPhrase',matchPhrase)
        localStorage.setItem('company',company)
        setadvanceQuery({ MatchPhrase: matchPhrase, company, name });
        setsearchQuery('');
    }
    function handleReset(){
        setMatchPhrase('');
        setCompany('');
        setName('');
        setadvanceQuery({});
        localStorage.setItem('matchPhrase','');
        localStorage.setItem('company','');
        localStorage.setItem('name','');
    }
  return (
    <div className="modal"  id="AdvancefilterModal" tabIndex="-1">
        <div className="modal-dialog   modal-dialog-scrollable" style={{color:'black'}}>
            <div className={`modal-content ` + (isDark ? "add-Modal-dark" : "") }>
            <div className="modal-header">
                <h5 className="modal-title" >Advance filter</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="mb-3 row" >
                    <label htmlFor="Company" className="col-sm-4 col-form-label ">Company:</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="Company" placeholder='Enter Company' 
                        value={company}
                        onChange={(e) => {
                            setCompany(e.target.value)
                            setMatchPhrase('');                        
                        }}/>
                    </div>
                </div>
                <div className="mb-3 row" >
                    <label htmlFor="Item" className="col-sm-4 col-form-label ">Item Name:</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="Item" placeholder='Enter Item' 
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            setMatchPhrase('');                        
                        }}
                        />
                    </div>
                </div>
                <div className="mb-3 row" >
                    <label htmlFor="ExactMatch" className="col-sm-4 col-form-label ">Exact Match:</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="ExactMatch" placeholder='Enter Pharse' 
                        value={matchPhrase}
                        onChange={(e) => {
                            setName('')
                            setCompany('')
                            setMatchPhrase(e.target.value)
                        }}/>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn" onClick={handleReset}>
                <i className="fa-solid fa-close"></i> Reset
                </button>
                <button type="button" className="btn" data-bs-dismiss="modal" onClick={handleApplyFilter}>
                <i className="fa-solid fa-search"></i> Apply filter
                </button>
            </div>
            </div>
        </div>
    </div>
    
  )
}
