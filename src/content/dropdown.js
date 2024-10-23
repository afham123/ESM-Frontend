import React from 'react'

export const Dropdown = ({setLimit,setPage, limit}) => {
    function dropdownHandler(val){
        setPage(1)
        setLimit(val)
        localStorage.setItem("limit", val);
    }
    //selected-show
    function getClass(val){
        // debugger;
        return "dropdown-item-show " + (limit === val ? 'selected-show' : '');
    }
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Rows: {limit}
            </button>
            <ul className="dropdown-menu">
                <li><p className={getClass(10)} onClick={() => dropdownHandler(10)} >10</p></li>
                <li><p className={getClass(20)} onClick={() => dropdownHandler(20)} >20</p></li>
                <li><p className={getClass(50)} onClick={() => dropdownHandler(50)} >50</p></li>
                <li><p className={getClass(100)} onClick={() => dropdownHandler(100)} >100</p></li>
            </ul>
        </div>
    )
}
