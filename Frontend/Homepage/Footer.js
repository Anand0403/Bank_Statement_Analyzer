import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, Grid } from '@mui/material';
import { Facebook, Instagram, LinkedIn, YouTube } from '@mui/icons-material';
import { keyframes } from '@mui/system';

const Footer = () => {
  const [query, setQuery] = useState('');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleQuerySubmit = () => {
    // Handle the query submission logic here
    alert("Query Submitted: " + query);
    setQuery('');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#2C3E50',
        color: 'white',
        padding: '40px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Footer Header */}
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', fontFamily: 'Arial' }}>
        Have a Question? Reach Out to Us!
      </Typography>

      {/* Query Submission Box */}
      <TextField
        label="Submit Your Query"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={query}
        onChange={handleQueryChange}
        sx={{
          marginBottom: 2,
          maxWidth: 600,
          backgroundColor: '#fff',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleQuerySubmit}
        sx={{
          marginBottom: 4,
          borderRadius: '25px',
          padding: '12px 30px',
          '&:hover': {
            backgroundColor: '#16A085',
          },
        }}
      >
        Submit Query
      </Button>

      {/* Footer Links Section */}
      <Grid container spacing={4} justifyContent="center" sx={{ marginBottom: 4 }}>
        <Grid item>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            About Us
          </Typography>
          <Typography variant="body2">Learn more about our mission and services.</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Our Team
          </Typography>
          <Typography variant="body2">Meet the team behind the service.</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Contact Us
          </Typography>
          <Typography variant="body2">Email: support@bankanalyzer.com</Typography>
          <Typography variant="body2">Phone: +123-456-7890</Typography>
        </Grid>
      </Grid>

      {/* Social Media Icons */}
      <Box>
        <IconButton
          href="https://www.linkedin.com"
          target="_blank"
          sx={{
            color: 'white',
            margin: 1,
            '&:hover': {
              color: '#0A66C2',
            },
          }}
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          href="https://www.youtube.com"
          target="_blank"
          sx={{
            color: 'white',
            margin: 1,
            '&:hover': {
              color: '#FF0000',
            },
          }}
        >
          <YouTube />
        </IconButton>
        <IconButton
          href="https://www.instagram.com"
          target="_blank"
          sx={{
            color: 'white',
            margin: 1,
            '&:hover': {
              color: '#E1306C',
            },
          }}
        >
          <Instagram />
        </IconButton>
        <IconButton
          href="https://www.facebook.com"
          target="_blank"
          sx={{
            color: 'white',
            margin: 1,
            '&:hover': {
              color: '#3B5998',
            },
          }}
        >
          <Facebook />
        </IconButton>
      </Box>

      {/* Footer Bottom Text */}
      <Typography variant="body2" sx={{ marginTop: 4, color: '#BDC3C7' }}>
        © 2025 Bank Statement Analyser | All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
