import React, { useState,useEffect } from 'react';
import { Grid, Button, TextField, Typography, Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import axios from 'axios';

const productsDataForm = () =>{
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productWeight, setProductWeight] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [allData, setAllData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/mongoproducts/');
        const data = await response.json();
        setAllData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    useEffect(() => {
    
        fetchData();
      }, []);



    const handleSubmit = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', selectedImage);
        axios.post('/api/v1/products', {
            productName,
            productPrice,
            productWeight,
            productQuantity,
            productDescription,
            // Image
        }).then(response=>{ 
            console.log(response.data);
          }).catch(err => { console.log(err); });
        setProductName('');
        setProductPrice('');
        setProductWeight('');
        setProductQuantity('');
        setProductDescription('');
        setSelectedImage(null);
        fetchData();
        }

    return (
        <Container>
            <div>
                <Typography gutterBottom variant='h2' align='center'>
                    Products Data Form
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container item sx={{width : '50%', m:'auto', textAlign : 'center'}}>
                        <Grid xs={12} item>
                            <TextField 
                            label='Product Name' 
                            size='small' 
                            fullWidth 
                            variant='outlined' 
                            required
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
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid xs={12} sx={{ mt: 4 }} item>
    <input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
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
                  <TableCell>
    {/* {data.productImage && <img src={data.productImage} alt="Product" style={{ width: '50px', height: '50px' }} />} */}
</TableCell>

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