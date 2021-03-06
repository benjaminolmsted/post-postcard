import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import Logout from './Logout'

export default function NavBar({ setUser }) {
  return (
    <Box >
      <AppBar position="fixed" style={{background: '#c5c5c5'}} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href='/' color="inherit">{ 'Post-a-Card' }</Link>
          </Typography>
            <Logout setUser={setUser} />
          </Toolbar>
      </AppBar>
    </Box>
  );
}