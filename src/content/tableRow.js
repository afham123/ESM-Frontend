import React from 'react'

export const TableRow = ({props}) => {
    return (
        <tr>
            <td><input type="checkbox" /></td>
            <td>{props.name}</td>
            <td>{props.category}</td>
            <td>{props.company}</td>
            <td>{props.contact_num}</td>
            <td>{props.email}</td>
            <td>{props.location}</td>
            <td>{props.GST_No}</td>
            <td>{props.GST_Turnover}</td>
            <td>{props.GST_Turnover}</td>
            <td>{props.Supplier_Type}</td>
        </tr>
    )
}
