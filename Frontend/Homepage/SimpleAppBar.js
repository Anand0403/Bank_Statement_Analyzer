import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Animation for rotating logo
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

function SimpleAppBar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #283593 0%, #5C6BC0 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      <Toolbar>
        {/* Menu icon */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 'auto' }}>
          <Box
            component="img"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png"
            alt="logo"
            sx={{
              width: 35,
              height: 35,
              mr: 1,
              animation: `${spin} 10s linear infinite`,
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              letterSpacing: 1,
              color: '#FFFFFF',
            }}
          >
            Bank Statement Analyser
          </Typography>
        </Box>

        {/* Buttons & Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/signin')}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '6px 16px',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: '#FFFFFF',
                color: '#3F51B5',
              },
            }}
          >
            Login
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/signup')}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '6px 16px',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: '#FFFFFF',
                color: '#3F51B5',
              },
            }}
          >
            Signup
          </Button>
          <Avatar
            alt="User"
            src="https://i.pravatar.cc/300"
            sx={{
              width: 42,
              height: 42,
              border: '2px solid white',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default SimpleAppBar;
