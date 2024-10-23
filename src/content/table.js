import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { filterData } from '../helper/filterData';
import { checkAll } from '../helper/util';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#273a4efc',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgb(0 0 0 / 30%)',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function BasicTable({data, select}) {
  function handleAllCheckBox(event){
    if(!event.target.checked) {return
    };
    checkAll()
    // debugger;
  }

  const cols = [];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {select && <StyledTableCell align="center"> <input type="checkbox" id="allCheckBox" onClick={handleAllCheckBox}></input></StyledTableCell>}
            {Object.keys(data[0]).map((field, index)=>{
              const i = filterData.findIndex((elem)=>elem.option === field)
              if(i===-1) return null
              cols.push(field)
              return (
                <StyledTableCell align="center" key={index}><b>{filterData[i].label}</b></StyledTableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { borderBottom: 0,
                borderLeft: "0.1px solid #8787876e" } }}
            >
              {select && <StyledTableCell align="center">
                <input type="checkbox" id={row._id}></input>
                </StyledTableCell>}
              {
                cols.map((vals, index)=>{
                return (
                  <StyledTableCell align="center" key={index}>{row[vals]}</StyledTableCell>
                )

              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}