import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomeBody() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false); // Simulating signed-in state
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleAnalyzeClick = () => {
    if (isUserSignedIn) {
      setOpenDialog(true);
    } else {
      navigate('/signin'); // Redirect to sign-in page if not signed in
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
      console.log('File uploaded:', file.name); // Handle file processing here
      handleCloseDialog();
    }
  };

  return (
    <Box sx={{ padding: '4rem', background: '#fff' }}>
      {/* Intro Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '4rem' }}>
        <img
          src="https://cdn.dribbble.com/users/179241/screenshots/14819147/media/f091506c77bca339dbec59c59fc2171c.gif"
          alt="Analyzer Illustration"
          style={{ width: '40%', borderRadius: '12px' }}
        />
        <Typography variant="h5" sx={{ width: '55%', color: '#007BFF', fontWeight: 500 }}>
          Our platform simplifies your financial life by analyzing bank statements and providing smart insights into your spending, savings, and budgeting patterns. Start your journey toward financial clarity today!
        </Typography>
      </Box>

      {/* Analyze Button */}
      <Box textAlign="center" sx={{ marginBottom: '5rem' }}>
        <Button variant="contained" sx={{ backgroundColor: '#007BFF' }} onClick={handleAnalyzeClick}>
          Analyze Now
        </Button>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ marginTop: '4rem' }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: '#007BFF' }}>
          Why Choose Us?
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {/* Render benefits cards */}
          {[/* Same benefit cards as before */].map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ maxWidth: 250, mx: 'auto', borderRadius: '12px', boxShadow: 3, height: '100%' }}>
                <CardMedia sx={{ height: 100 }} image={card.image} title={card.title} />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: '#007BFF', fontWeight: 'bold' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
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
