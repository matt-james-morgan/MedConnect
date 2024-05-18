import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Button, Input, Box } from '@mui/material';
import { UserSignedIn } from '../App';

const SearchClinicsByAddressForm = ({setCoordinates, setSearchTermMarker}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { userState } = useContext(UserSignedIn);

  const handleSearchByAddress = (e) => {
    e.preventDefault();
    if (searchTerm) {
      axios.get(`clinics/api/geocode?address=${searchTerm}`)
      .then(response => {
        const { latitude, longitude } = response.data;
        setCoordinates({ lat: latitude, lng: longitude });
        setSearchTermMarker(true);
      })
      .catch(error => {
        console.error('Error geocoding address:', error);
      });
    }
  };
  
  return (
    <Box width="100%">
      <form onSubmit={handleSearchByAddress} width="100%">
        <Box display="flex" justifyContent="space-between">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter your zip code or address"
            sx={{
              minWidth: "300px"
            }}
          />
          <Button type='submit'>Search</Button>
        </Box>
      </form>
    </Box>
  );
};

export default SearchClinicsByAddressForm;
