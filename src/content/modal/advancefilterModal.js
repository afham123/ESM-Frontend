import React, { useState } from 'react'
import { advancefilter, advancefilterData } from '../../helper/util';

export const AdvancefilterModal = ({ isDark, setadvanceQuery, setsearchQuery }) => {
    const [advanceFilter, setAdvanceFilter] = useState(JSON.parse(localStorage.getItem('advanceFilter')) || advancefilter);
    
    function handleApplyFilter() {
        console.log(advancefilter);
        localStorage.setItem('advanceFilter', JSON.stringify(advanceFilter))
        
        setadvanceQuery(advanceFilter);
        setsearchQuery('');
    }
    function handleReset() {
        setAdvanceFilter(advancefilter);
        setadvanceQuery({});
        localStorage.setItem('advanceFilter', JSON.stringify(advanceFilter))
    }
    function handleChange(e) {
        const value = e.target.value;
        let element = e.target.id;
        debugger
          
        if ( element !== 'MatchPhrase'){
            setAdvanceFilter((prev) => ({
                ...prev,
                'MatchPhrase' : '',
                [element] : value
            }));
        }
        else{
            setAdvanceFilter((prev) => ({
                ...advancefilter,
                'MatchPhrase' : value,
            }));
        }
    }
    return (
        <div className="modal" id="AdvancefilterModal" tabIndex="-1">
            <div className="modal-dialog   modal-dialog-scrollable" style={{ color: 'black' }}>
                <div className={`modal-content ` + (isDark ? "add-Modal-dark" : "")}>
                    <div className="modal-header">
                        <h5 className="modal-title" >Advance filter</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {advancefilterData.map((elem, index) => (
                            <div key={index} className="mb-3 row" >
                                <label htmlFor={elem} className="col-sm-4 col-form-label ">{elem.label}:</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id={elem.value} placeholder={`${elem.label}`}
                                        value={advanceFilter[elem.value]}
                                        onChange={handleChange} />
                                </div>
                            </div>))}
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
