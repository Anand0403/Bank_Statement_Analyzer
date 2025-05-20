import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// MUI Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Animation for rotating logo
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Helper to get initial from name
function getInitial(name) {
  if (!name) return '';
  return name.charAt(0).toUpperCase();
}

function SimpleAppBar() {
  const navigate = useNavigate();

  // Simulated user state
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);
  const [user, setUser] = useState({
    name: 'John Doe',
    photoURL: '',
  });

  // Menu state for avatar dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = () => {
    setIsUserSignedIn(false);
    setUser(null);
    handleClose();
    navigate('/signin');
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #283593 0%, #5C6BC0 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      <Toolbar>
        {/* Removed Menu icon */}

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

        {/* Always show Login and Signup */}
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

          {/* Show avatar only if signed in */}
          {isUserSignedIn && user && (
            <>
              <Avatar
                alt={user?.name || ''}
                src={user?.photoURL || ''}
                sx={{
                  width: 42,
                  height: 42,
                  border: '2px solid white',
                  bgcolor: !user?.photoURL ? '#1976d2' : 'transparent',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
                onClick={handleAvatarClick}
              >
                {!user?.photoURL ? getInitial(user?.name) : null}
              </Avatar>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    minWidth: 180,
                    borderRadius: 2,
                    boxShadow:
                      '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <MenuItem
                  onClick={() => handleMenuClick('/account')}
                  sx={{ '&:hover': { backgroundColor: '#E3F2FD', color: '#1976d2' } }}
                >
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" sx={{ color: '#1976d2' }} />
                  </ListItemIcon>
                  Account
                </MenuItem>

                <MenuItem
                  onClick={() => handleMenuClick('/my-analyzations')}
                  sx={{ '&:hover': { backgroundColor: '#E3F2FD', color: '#1976d2' } }}
                >
                  <ListItemIcon>
                    <HistoryIcon fontSize="small" sx={{ color: '#1976d2' }} />
                  </ListItemIcon>
                  My Analyzations
                </MenuItem>

                <MenuItem
                  onClick={() => handleMenuClick('/settings')}
                  sx={{ '&:hover': { backgroundColor: '#E3F2FD', color: '#1976d2' } }}
                >
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" sx={{ color: '#1976d2' }} />
                  </ListItemIcon>
                  Settings
                </MenuItem>

                <MenuItem
                  onClick={handleLogout}
                  sx={{ '&:hover': { backgroundColor: '#E3F2FD', color: '#d32f2f' } }}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: '#d32f2f' }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default SimpleAppBar;
