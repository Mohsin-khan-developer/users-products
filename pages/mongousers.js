import React, { useState,useEffect } from 'react';
import { Grid, Button, TextField, Typography, Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import axios from 'axios';


const UserDataForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [allData, setAllData] = useState([]);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fileType = file.type;

    if (file) {
      setImageName(fileName);
      setImageType(fileType);
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataURL = reader.result;
        setImage(imageDataURL);
       
      };

      reader.readAsDataURL(file);
    }
  };




  const fetchData = async () => {
    try {
      const response = await fetch('/api/v1/users');
      const data = await response.json();
      setAllData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    
    fetchData();
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the form data
    console.log({
      firstName,
      lastName,
      address,
      contactInfo
    });

    axios.post('/api/v1/users',{
      firstName,
      lastName,
      address,
      contactInfo
    }).then(response=>{ 
      console.log(response);
    }).catch(err => { console.log(err); });
    // Clear form inputs
    setFirstName('');
    setLastName('');
    setAddress('');
    setContactInfo('');
    fetchData();
  };

  return (
    <Container>
      <div className='user'>
        <Typography gutterBottom variant='h2' align='center'>
          Users Data Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container item sx={{ width: '50%', m: 'auto', textAlign: 'center' }}>
            <Grid xs={12} item>
              <TextField
                size='small'
                fullWidth
                id='outlined-basic'
                label='First Name'
                variant='outlined'
                required
                type='string'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
              <TextField
                size='small'
                fullWidth
                id='outlined-basic'
                label='Last Name'
                variant='outlined'
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 4 }} item>
              <TextField
                size='small'
                fullWidth
                id='outlined-basic'
                label='Address'
                variant='outlined'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 4 }} item>
              <TextField
                size='small'
                fullWidth
                id='outlined-basic'
                label='Contact Information'
                variant='outlined'
                required
                value={contactInfo}
                type='number'
                onChange={(e) => setContactInfo(e.target.value)}
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 4 }} item>
            <TextField
                size='small'
                fullWidth
                id='outlined-basic'
                // label='Contact Information'
                variant='outlined'
                required
                // value={selectedFile.name}
                type='file'
                onChange={handleFileChange}
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 4 }} item>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="h3" align="center" gutterBottom>
          All Data
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 4, mx: 'auto' }} item>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Contact Info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData.map((data) => (
                <TableRow key={data._id}>
                  <TableCell>{data.firstName}</TableCell>
                  <TableCell>{data.lastName}</TableCell>
                  <TableCell>{data.address}</TableCell>
                  <TableCell>{data.contactInfo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


      </div>
    </Container>
  );



  
};

export default UserDataForm;
