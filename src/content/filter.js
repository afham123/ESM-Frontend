import React, { useState } from 'react';
import { Menu, MenuItem, FormControlLabel, Checkbox, Button } from '@mui/material';
import { filterData } from '../helper/filterData';

const options = {};
filterData.forEach(e => {
  options[e.option] = true;
});

const DropdownFilter = ({setRequestedFields}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState((localStorage.getItem('selectedFilters') && JSON.parse(localStorage.getItem('selectedFilters'))) || options);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // debugger;
    // console.log(selectedFilters)
    const seleted =["numericId","_id"];
    for(const field of Object.keys(selectedFilters)){
      if(selectedFilters[field])
        seleted.push(field)
    }
    console.log(seleted)
    setRequestedFields(seleted);
    localStorage.setItem('seleted', seleted)
    localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters))

    setAnchorEl(null);
  };

  const handleFilterChange = (option) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <>
      <Button  className='me-2' variant="contained" onClick={handleClick} startIcon={<i className="fa-solid fa-filter"></i>}>
        Filter
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: '300px', // Optional: limit height if there are many items
            width: '250px', // Set width for dropdown
          }
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
          {filterData.map((item, index) => (
            <div key={index} style={{ width: '60%' }}> {/* Each item takes up 50% width to create two columns */}
              <MenuItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedFilters[item.option]}
                      onChange={() => handleFilterChange(item.option)}
                    />
                  }
                  label={item.label}
                />
              </MenuItem>
            </div>
          ))}
        </div>
      </Menu>
    </>
  );
};

export default DropdownFilter;
