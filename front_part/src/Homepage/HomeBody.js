import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomeBody() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const benefits = [
    {
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      title: 'Smart Budgeting',
      description: 'Easily track your expenses and manage your budget with our intelligent analysis tools.',
    },
    {
      image: 'https://cdn-icons-png.flaticon.com/512/9432/9432615.png',
      title: 'Spending Insights',
      description: 'Visualize your spending habits and identify areas to save more effectively.',
    },
    {
      image: 'https://cdn-icons-png.flaticon.com/512/4072/4072229.png',
      title: 'Secure Data',
      description: 'We use bank-grade security to ensure your financial data is protected at all times.',
    },
    {
      image: 'https://cdn-icons-png.flaticon.com/512/3257/3257733.png',
      title: 'Download Reports',
      description: 'Generate detailed reports of your financial activity and download them anytime.',
    },
  ];

  const handleAnalyzeClick = () => {
    if (isUserSignedIn) {
      setOpenDialog(true);
    } else {
      navigate('/signin');
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFile(null);
  };

  const handleFileSubmit = () => {
    if (file) {
      console.log('File uploaded:', file.name);
      handleCloseDialog();
    }
  };

  return (
    <Box sx={{ padding: '4rem', background: '#fff' }}>
      {/* Intro Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: '4rem',
        }}
      >
        <img
          src="https://cdn.dribbble.com/users/179241/screenshots/14819147/media/f091506c77bca339dbec59c59fc2171c.gif"
          alt="Analyzer Illustration"
          style={{ width: '40%', borderRadius: '12px' }}
        />
        <Typography
          variant="h5"
          sx={{ width: '55%', color: '#007BFF', fontWeight: 500 }}
        >
          Our platform simplifies your financial life by analyzing bank statements and providing smart insights into your spending, savings, and budgeting patterns. Start your journey toward financial clarity today!
        </Typography>
      </Box>

      {/* Analyze Button */}
      <Box textAlign="center" sx={{ marginBottom: '5rem' }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#007BFF' }}
          onClick={handleAnalyzeClick}
        >
          Analyze Now
        </Button>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ marginTop: '4rem' }}>
       <Typography
  variant="h4"
  align="center"
  sx={{ fontWeight: 'bold', mb: 4, color: '#007BFF', cursor: 'pointer' }}
  onClick={() => navigate('/datadisplay')}
>
  Why Choose Us?
</Typography>


        <Grid container spacing={2} justifyContent="center">
          {benefits.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  perspective: '1000px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: 250,
                    height: 300,
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    '&:hover': {
                      transform: 'rotateY(180deg)',
                    },
                  }}
                >
                  {/* Front Side */}
                  <Card
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      borderRadius: '12px',
                      boxShadow: 3,
                      backgroundColor: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CardMedia
                      sx={{ height: 100, width: 100, objectFit: 'contain', marginTop: 2 }}
                      image={card.image}
                      title={card.title}
                    />
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: '#007BFF', fontWeight: 'bold', textAlign: 'center' }}
                      >
                        {card.title}
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Back Side */}
                  <Card
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      borderRadius: '12px',
                      boxShadow: 3,
                      backgroundColor: '#007BFF',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    <CardContent>
                      <Typography variant="body2">{card.description}</Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* File Upload Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please select a CSV or Excel file for analysis:
          </Typography>
          <Input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          {file && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              Selected File: {file.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFileSubmit} color="primary" disabled={!file}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default HomeBody;
