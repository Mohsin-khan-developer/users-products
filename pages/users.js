import React, { useState, useEffect } from 'react';
import { FormControl, textSizeAdjust, Tooltip, IconButton, InputLabel, Select, MenuItem, Grid, Button, TextField, Typography, Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import axios from 'axios';
import { EditIcon } from '@mui/material';
import { Update } from '@mui/icons-material';
import { uploadImageToS3 } from '../config/s3-credentials';
import { createCanvas, loadImage } from 'canvas';


const UserDataForm = () => {
  const [imageName, setImageName] = useState('');
  const [imageType, setImageType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [id,setid]=useState('');
  const [allData, setAllData] = useState([]);
  const [type, setType] = useState('');
  const [database, setDatabase] = useState('');
  const [image, setImage] = useState('');
  // let fileName = '';
  // fileName = selectedFile.fileName;

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
      const response = await fetch('/api/v1/user');
      const data = await response.json();
      setAllData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchMongoData = async () => {
    try {
      const response = await fetch('/api/v1/mongousers');
      const data = await response.json();
      setAllData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    if (database === "MySQL")
      fetchData();
    else if (database === "MongoDB") {
      fetchMongoData();
    }
  
  }, [database]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleFileChange(e);
  //   if (image) {
  //     try {
  //       // Convert the image to base64 string
  //       const base64Image = image.split(',')[1];

  //       // Send the image data and other fields to the API
  //       const response = await axios.post('/api/upload', {
  //         firstName,
  //         lastName,
  //         image: base64Image
  //       });

  //       console.log('Image uploaded successfully:', response.data);
  //     } catch (error) {
  //       console.error('Error uploading image:', error);
  //     }
  //   } else {
  //     console.log('No image selected');
  //   }
  // };




  if (type === 'mysql') {
      const base64Image = image.split(',')[1];
      const fileName = imageName;
      const fileType = imageType;
      axios.post('/api/v1/mysqlPost', {
        firstName,
        lastName,
        address,
        contactInfo,
        image: base64Image,
        fileName,
        fileType
      }).then(response => {
        setFirstName('');
        setLastName('');
        setAddress('');
        setContactInfo('');
        setid('');
        // console.log(fileName);
        console.log(response);
        fetchData();
      }).catch(err => {
        console.log(err);
      });
    } else if (type === 'mongodb') {
      const base64Image = image.split(',')[1];
      const fileName = imageName;
      const fileType = imageType;
      axios.post('/api/v1/mongousers', {
        firstName,
        lastName,
        address,
        contactInfo,
        image: base64Image,
        fileName,
        fileType
      }).then(response => {
        console.log(response);
      }).catch(err => { console.log(err); });
      resetValues();
      fetchMongoData();
    } else if (type === 'mysqlUpdate') {
      axios.put('/api/v1/user/', {
        firstName,
        lastName,
        address,
        contactInfo,
        id
      }).then(response => {
        // console.log(response);
        fetchData();
        resetValues();
      }).catch(err => { console.log(err); });
      // resetValues();
    } else if (type === 'mongoUpdate') {
      console.log('this is Mongodb database ');
      axios.put('/api/v1/mongousers', {
        firstName,
        lastName,
        address,
        contactInfo,
        id
      }).then(response => {
        console.log(response);
      }).catch(err => { console.log(err); });
      resetValues();
      fetchMongoData();
    }
  }

  // if(type === 'showMysql') {
  //   fetchData();
  // } else if (type === 'showMongodb') {
  //   fetchMongoData();
  // }


  const handleUserSelect = (data) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setAddress(data.address);
    setContactInfo(data.contactInfo);
    setid(data._id);
  };

  const resetValues = () => {
    setFirstName('');
      setLastName('');
      setAddress('');
      setContactInfo('');
      setid('');
      // setSelectedFile('');
  }

  // const handleFileChange = (event) => {
  //    setSelectedFile(event.target.files[0]);
  //   // const fileName = event.target.files[0].name;
  //   // setSelectedFile(fileName);
  // };



  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   fileName = file.name;

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       const imageDataURL = reader.result;
  //       setImage(imageDataURL);
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };




  const handleUpload = async () => {
    if (selectedFile) {
      console.error(selectedFile.name);
      return;
    } else if (!selectedFile){
      console.log('No file selected');
    }

    // try {
    //   const imageUrl = await uploadImageToS3(selectedFile, selectedFile.name);
    //   console.log('Image URL:', imageUrl);
    // } catch (error) {
    //   console.error('Error uploading image:', error);
    // }
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

                value={ firstName}
                onChange={(e) => setFirstName(e.target.value )}
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
                onChange={(e) => setContactInfo(e.target.value )}
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
            <Grid xs={12} sx={{ mt: 4, mr: 4 }} item>
              <Button type='submit' onClick={() => setType('mysql')} variant='contained'>
                MySQL
              </Button>
              <Button type='submit' variant='contained' sx={{ ml: 1 }} item onClick={() => setType('mongodb')} >
                MongoDB
              </Button>
              <Button type='submit' variant='contained' sx={{ ml: 1 }} item onClick={() => setType('mysqlUpdate')} >
                MySQL-Update
              </Button>
              <Button type='submit' variant='contained' sx={{ ml: 1 }} item onClick={() => setType('mongoUpdate')} >
                Mongo-Update
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="h3" align="center" gutterBottom>
          All Data
        </Typography>
        <Grid container item sx={{ width: '20%', m: 'auto', textAlign: 'center' }}>
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label" sx={{alignContent:'center',ml:'20%' }}>{database}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
            >
              <MenuItem onClick={() => setDatabase('MySQL')}>MySQL</MenuItem>
              <MenuItem onClick={() => setDatabase('MongoDB')}>MongoDB</MenuItem>
            </Select>
          </FormControl>
        </Grid>
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
              {allData.length > 0 ? (
                allData.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell>{data.firstName}</TableCell>
                    <TableCell>{data.lastName}</TableCell>
                    <TableCell>{data.address}</TableCell>
                    <TableCell>{data.contactInfo}</TableCell>
                    <Button variant='contained' sx={{ mt: 1 }} onClick={() => handleUserSelect(data)} >Update</Button>

                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">No data available</TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>


      </div>
    </Container>
  );




};

export default UserDataForm;
