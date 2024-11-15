import React from 'react'

export const Dropdown = ({setLimit,setPage, limit, isDIsable}) => {
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
    const list = [10,20,50,100,200,400,1000]
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" disabled={isDIsable} aria-expanded="false">
                Rows: {limit}
            </button>
            <ul className="dropdown-menu">
                {list.map(elem=>{
                    return (<li key={elem}>
                        <p className={getClass(elem)} onClick={() => dropdownHandler(elem)} >{elem}</p>
                    </li>)
                })}
            </ul>
        </div>
    )
}
