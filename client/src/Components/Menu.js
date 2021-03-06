import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from 'react-router-dom'
import BurstModeIcon from '@mui/icons-material/BurstMode';
import PanoramaIcon from '@mui/icons-material/Panorama';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopIcon from '@mui/icons-material/Shop';
import Badge from '@material-ui/core/Badge';


function Menu({ cart }){
    const drawerWidth = 240
    const history = useHistory()

    function goTo(url){
      history.push(url)
    }


    return (<> <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem onClick={()=>goTo('/')} button key={"All postcards"}>
                <ListItemIcon>
                  <BurstModeIcon />
                </ListItemIcon>
                <ListItemText primary={"All postcards"} />
              </ListItem>
              <ListItem onClick={()=>goTo('/my_postcards')} button key={"My postcards"}>
                <ListItemIcon>
                  <PanoramaIcon />
                </ListItemIcon>
                <ListItemText primary={"My postcards"} />
              </ListItem>
              <ListItem onClick={()=>goTo('/generator')} button key={"Generate postcard"}>
                <ListItemIcon>
                  <AppRegistrationIcon />
                </ListItemIcon>
                <ListItemText primary={"Generate postcard"} />
              </ListItem>
          </List>
          <Divider />
          <List>
              <ListItem onClick={()=>goTo('/cart')} button key={"Cart"}>
                <ListItemIcon>
                <Badge color="secondary" badgeContent={cart.reduce((prevVal, currVal) => prevVal + currVal.amount, 0 )} >
                  <ShoppingCartIcon />
                </Badge>
                </ListItemIcon>
                <ListItemText primary={"Cart"} />
              </ListItem>
              <ListItem onClick={()=>goTo('/orders')} button key={"Orders"}>
                <ListItemIcon>
                  <ShopIcon />
                </ListItemIcon>
                <ListItemText primary={"Orders"} />
              </ListItem>
          </List>
        </Box>
      </Drawer></>)
}

export default Menu