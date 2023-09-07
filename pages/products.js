import React, { useState,useEffect } from 'react';
import { useForm } from "react-hook-form";
import {FormControl,InputLabel,Select,MenuItem, Grid, Button, TextField, Typography, Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import axios from 'axios';
import ButtonAppBar from '@/app/page';

{/* <ButtonAppBar />  */}
const productsDataForm = () =>{
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productWeight, setProductWeight] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [id,setid]=useState('');
    const [allData, setAllData] = useState([]);
    const [type, setType] = useState('');
    const [database,setDatabase] = useState('');
    const [selectedProduct,setSelectedProduct] = useState('');
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  // console.log(watch()); 
    
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/products');
        const data = await response.json();
        setAllData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchMongoData = async () => {
      try {
        const response = await fetch('/api/v1/mongoproducts');
        const data = await response.json();
        setAllData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      if(database === 'MySQL') {
        fetchData();
      } else if (database === 'MongoDB') {
        fetchMongoData();
      }
      }, [database]);



    const onSubmit = (data) =>{
        // e.preventDefault();
        // fetch("/api/v1/products",{
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     productName,
        //     productPrice,
        //     productWeight,
        //     productQuantity,
        //     productDescription
        //   }),
        // }).then((res)=> res.json())
        // .then((data) => {
        //             console.log(data);
        //           })


        if (type === 'mysql') {
          axios.post('/api/v1/products',{
            productName,
          productPrice,
          productWeight,
          productQuantity,
          productDescription
          }).then(response=>{ 
            console.log(response);
          }).catch(err => { console.log(err); });
        resetValues();
          fetchData();
        } else if(type === 'mongoUpdate') {
          // console.log('this is Mongodb database ');
          axios.put('/api/v1/mongoproducts',{
            productName,
            productPrice,
            productWeight,
            productQuantity,
            productDescription,
            id
          }).then(response=>{ 
            console.log(response);
          }).catch(err => { console.log(err); });
          resetValues();
        fetchMongoData();
        } else if (type === 'mysqlUpdate') {
          axios.put('/api/v1/products',{
            productName,
            productPrice,
            productWeight,
            productQuantity,
            productDescription,
            id
          }).then(response=>{ 
            console.log(response);
          }).catch(err => { console.log(err); });
          resetValues();
        fetchData();
        }
        
        };

        const handleSelectedProduct = (data) => {
          setProductName(data.productName);
          setProductPrice(data.productPrice);
          setProductWeight(data.productWeight);
          setProductQuantity(data.productQuantity);
          setProductDescription(data.productDescription);
          setid(data._id);
          // alert(data._id);
        }

        const resetValues = () => {
          setProductName('');
          setProductPrice('');
          setProductDescription('');
          setProductQuantity('');
          setProductWeight('');
        };
        

    return (
        <Container>
            <div>
                <Typography gutterBottom variant='h2' align='center'>
                    Products Data Form
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container item sx={{width : '50%', m:'auto', textAlign : 'center'}}>
                        <Grid xs={12} item>
                            <TextField 
                            label='Product Name' 
                            size='small' 
                            fullWidth 
                            variant='outlined' 
                            required
                            // {...register('selectedProduct')}
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            />
                            
                        </Grid>
                        <Grid xs={12} sx={{ mt: 4 }} item>
                        <TextField
                           label='Product Price' 
                            size='small'
                            fullWidth
                            variant='outlined'
                            required
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                  />
                        </Grid>
                        <Grid xs={12} sx={{ mt: 4 }} item>
                            <TextField 
                            label='Weight' 
                            size='small'
                            fullWidth
                            variant='outlined'
                            required
                            // {...register("productweight")}
                            value={productWeight} 
                            onChange={(e) => setProductWeight(e.target.value)}
                            />
                        </Grid>
                        <Grid xs={12} sx={{ mt: 4 }} item>
                            <TextField
                            label='In-stock quantity'
                            size='small'
                            fullWidth
                            variant='outlined'
                            required
                            // {...register("productQuantity")}
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(e.target.value)}
                            />
                        </Grid>
                        <Grid xs={12} sx={{ mt: 4 }} item>
                            <TextField
                            label='Description'
                            size='small'
                            fullWidth
                            variant='outlined'
                            required
                            // {...register("productDescription")}
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid xs={12} sx={{ mt: 4 }} item>
    {/* <input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} /> */}
</Grid>

<Grid xs={12} sx={{ mt: 4,mr:4 }} item>
              <Button type='submit' onClick={() =>setType('mysql')} variant='contained'>
                MySQL
              </Button>
              <Button type='submit' variant='contained'  sx={{ml:1 }} item onClick={() => setType('mongodb')} >
                MongoDB
              </Button>
              <Button type='submit' variant='contained'  sx={{ml:1 }} item onClick={() => setType('mysqlUpdate')} >
                MySQL-Update
              </Button>
              <Button type='submit' variant='contained'  sx={{ml:1}} item onClick={() => setType('mongoUpdate')} >
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
  <InputLabel id="demo-simple-select-label" sx={{alignContent:'center',ml:'20%' }} item>{database}</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={age}
    // label="Age"
    // onChange={handleChange}
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
                <TableCell>Product Name</TableCell>
                <TableCell>Product Price</TableCell>
                <TableCell>Product Weight</TableCell>
                <TableCell>In-stock quantity</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData.map((data) => (
                <TableRow key={data._id}>
                  <TableCell>{data.productName}</TableCell>
                  <TableCell>{data.productPrice}</TableCell>
                  <TableCell>{data.productWeight}</TableCell>
                  <TableCell>{data.productQuantity}</TableCell>
                  <TableCell>{data.productDescription}</TableCell>
                  <TableCell> <Button variant='contained' sx={{mt:1}} onClick={() => handleSelectedProduct(data)} >Update</Button></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
            </div>
        </Container>
    )
}

export default productsDataForm;