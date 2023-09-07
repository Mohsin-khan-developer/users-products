'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" >
            <Link href="/users" passHref sx={{ color:'white'}}>
              <Button color="inherit" variant='contained'>Users Data</Button>
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ ml:5}}>
            <Link href="/products" passHref sx={{ color:'white'}}>
              <Button color="inherit" variant='contained' >Products Data</Button>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
