import React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useAuth } from 'react-oidc-context';
import { CircularProgress } from '@mui/material';

export const ProfileMenu:React.FC<{logoutfn: () => void}> = ({logoutfn}) => {
  const { user, isLoading, isAuthenticated, clearStaleState, signoutRedirect} = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const logoutHandler = async () => {
    try {
        await clearStaleState();
        await signoutRedirect();
        window.location.href = '/';
    } catch (e) {
        console.log('Error on signoutRedirect', e);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
      isLoading && !isAuthenticated ? <CircularProgress color="secondary" /> : (
        <><Tooltip title="Profile Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={user ? user['profile']['avatar_url'] : ''}></Avatar>
          </IconButton>
        </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          Signed in as&nbsp;<b>{user['profile']['login']}</b>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          Your Gists
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Starred Gists
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Help
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          Your Github Profile
        </MenuItem>
        <MenuItem onClick={logoutHandler}>
          Logout
        </MenuItem>
      </Menu>
      </>
      )
  );
}

export default ProfileMenu;