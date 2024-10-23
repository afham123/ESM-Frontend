import * as React from 'react';
import { Pagination } from '@mui/material';

export function TablePaginationActions({page}) {
  
    return (
      <div >
        <Pagination count={10}  variant="outlined" shape="rounded" page={page}   />
      </div>
    )
}