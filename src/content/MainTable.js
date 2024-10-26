import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Dropdown } from './dropdown';
import { allFields, closeDialgog, darkModeHandler, exportToCsv, getChekedId } from '../helper/util';
import Pagination from '@mui/material/Pagination';
import DropdownFilter from './filter';
import BasicTable from './table';
import { Loading } from './loading';
import { AddModal } from "./modal/addModal"
import { Uploadmodal } from './modal/uploadmodal';
import { deleteItemMutation, generateDynamicQuery } from '../helper/gql';
import { AdvancefilterModal } from './modal/advancefilterModal';

export const MainTable = () => {
    const [requestedFields, setRequestedFields] = useState(localStorage.getItem('seleted')?.split(',') || allFields);
    const query = gql(generateDynamicQuery(requestedFields));
    const [isDark, setDark] = useState(localStorage.getItem('darkMode') === 'dark');
    const [searchQuery, setsearchQuery] = useState('');
    // debugger;
    const [limit, setLimit] = useState(localStorage.getItem('limit') || 10)
    const [page, setPage] = useState(1);
    const [select, setSelect] = useState(false);
    const [editData, setEditData] = useState({})
    const [scroll_id, setscroll_id] = useState("");
    const [advanceQuery, setadvanceQuery] = useState({});
    
    const mutattion = gql(deleteItemMutation())
    const [deleteItems] = useMutation(mutattion);

    function hadleSelec() {
        setSelect(!select);
    }

    const handlePageChange = (event, value) => {
        if (searchQuery!=='') {
            const scrollData = localStorage.getItem('scroll_Data');
            console.log('scrollData', scrollData);
            // let destinationPage = event.target.
            if(scrollData) setscroll_id(JSON.parse(scrollData)[`${value}|${limit}`]);
        }
        setPage(value); // Update the state with the selected page
        // refetch()
    };
    function handleDownload() {
        const ids = getChekedId();
        const downloadData = data.items.data.filter(e => ids.includes(e._id))
        console.log('download data:', downloadData);
        exportToCsv(downloadData);
    }
    async function handleDelete() {
        const ids = getChekedId();
        if (ids.length === 0)
            return
        console.log('deleting ids', ids);
        let res;
        try {
            res = await deleteItems({ variables: {ids } })
            if(res.data.deleteItem.msg !=null) throw (res.data.deleteItem.msg)
                refetch()
            window.alert('Selected rows deleted successfully')
        }
        catch (err) {
            window.alert(res?.msg, err.message);
        }
    }
    function handleEdit() {
        debugger;
        const ids = getChekedId();
        if (ids.length !== 1) {
            closeDialgog(ids.length === 0 ? 'Please select one row for edit' : 'Please select not more than one row for edit')
            return;
        }
        setEditData(()=>{
            const editdata_ = data.items.data[data.items.data.findIndex(e => e._id === ids[0])]
            console.log('editdata', editdata_)
            return editdata_;
        })
        // console.log(data.items[data.items.findIndex(e => e._id === ids[0])])
    }
    function handlesearch(e){
        if (e.key === 'Enter' || e.keyCode === 13) {
            // Do something
            setadvanceQuery({})
            console.log(e.target.value);
            setsearchQuery(e.target.value);
            localStorage.removeItem("scroll_Data");
            setPage(1);
            setscroll_id("")
        }   
    }
    const { loading, error, data,refetch } = useQuery(query, {
        variables: { skip: (Number(page) - 1) * 10, limit: Number(limit), searchQuery, scroll_id, advanceQuery },
    })
    // Use useEffect to refetch when data.scroll_id is available
    useEffect(() => {
        if (data?.items.scroll_id) {
            debugger;
            let scrollData = localStorage.getItem('scroll_Data');
            if(scrollData) scrollData = JSON.parse(scrollData);
            else scrollData = {};
            localStorage.setItem('scroll_Data', JSON.stringify({...scrollData, [`${page+1}|${limit}`] : data?.items.scroll_id}))
        }        
    }, [data?.items?.scroll_id, limit , page]);
    if (isDark) document.body.classList?.add("dark-mode");

    if (loading) 
        return <Loading /> 
    else if (error) return <h1>{error.message}</h1>
    if (isDark) {
        setTimeout(() => {
            document.querySelector(".container")?.classList.add("dark-mode");
            document.querySelectorAll("table").forEach((table) => {
                table.classList.add("dark-mode");
            });
            if( document.getElementById('searchInput'))
            document.getElementById('searchInput').value = searchQuery;
        }, 10)
    }
    // debugger;
    return (
        <div className="container">
            <header>
                <h1>Mahavir Agencies</h1>
                <div className="actions">
                    <button id="darkModeToggle" onClick={() => darkModeHandler(setDark, isDark)} >
                        {isDark ?
                            <><i className="fa-solid fa-sun"></i> Day</> :
                            <><i className="fa-solid fa-moon"></i> Night</>
                        }
                    </button>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#uploadModal">
                        <i className="fa-solid fa-cloud-arrow-up"></i> Upload
                    </button>
                    <Uploadmodal  refetch={refetch} isDark={isDark}/>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i className="fa-solid fa-plus"></i> Add
                    </button>
                    <AddModal isDark={isDark} editData={editData} setEditData={setEditData} refetch={refetch}/>
                </div>
            </header>

            <div className="sub-header">
                <div className="views">
                    <div style={{ width: "100%" }} className="row">
                        <div className="col">
                            <DropdownFilter setRequestedFields={setRequestedFields} />
                            {select && <button type='button' data-bs-toggle="modal" data-bs-target="#exampleModal" className='me-2' onClick={handleEdit}>
                                <i className=" fa-solid fa-pen-to-square"></i> Edit
                            </button>}
                            <button className='me-2' onClick={hadleSelec}>
                                <i className={"fa-solid " + (!select ? " fa-square-check" : "fa-close")}></i>{select ? " Reset" : " Select"}
                            </button>
                            {select && <button className='me-2' onClick={handleDownload}><i className="fa-solid fa-download"></i> Download</button>}
                            {select && <button className='me-2' onClick={handleDelete}><i className="fa-solid fa-trash"></i> Delete</button>}
                            <button  type="button" data-bs-toggle="modal" data-bs-target="#AdvancefilterModal"><i className="fa-solid fa-filter"></i> Advance Filter</button>
                            <AdvancefilterModal setadvanceQuery={setadvanceQuery} isDark={isDark}/>
                        </div>
                        <div className="col col-end">
                            <input style={{ width: "auto" }} id="searchInput" type="text" onKeyUp={handlesearch} 
                            className="form-control search-input" placeholder="Search"  />
                        </div>
                    </div>
                </div>
            </div>
            {data.items && data.items.data && data.items.data.length!==0 ? <BasicTable data={data.items.data} select={select} />: <h1> To Data found to  display</h1>}
            <div className="actions-bottom">
                 <Dropdown isDIsable={data.items=== undefined || searchQuery!==""} limit={limit} setLimit={setLimit} setPage={setPage} />
                <Pagination count={data.items ? Math.ceil( data.items.totalDocs / limit) : 0} variant="outlined" shape="rounded" page={page} onChange={handlePageChange} />
            </div>
        </div>
    )
}
