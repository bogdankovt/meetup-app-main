import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'
import TextLink from '../components/TextLink';
import { Divider, ListItemIcon } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getAuthStatus, userSelector } from '../features/Public/Login/LoginSlice';
import { useEffect } from 'react';


const stringAvatarName = (name: string) => {
  return name.search('@') != -1 ? name[0] : `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
}

const navLinks: { [key: string]: any } = {
  Anonym: [],
  Guest: [],
  Admin: [
    ['Управління мітапами', '/a/meetups'],
    ['Контакти', '/a/contacts'],
    ['Статистика', '/a/statistic']
  ]
}

const ResponsiveAppBar = () => {

  const user = useSelector(userSelector);

  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    dispatch(getAuthStatus())
  }, [])

  return (
    <AppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <TextLink to='/' variant='h6' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>InterLink Meetup</TextLink>

          <Box sx={{ display: { xs: navLinks[user.role].length ? 'flex' : 'none', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                width: ' 500px',
                display: { xs: 'block', md: 'none' },
              }}
            >

              {navLinks[user.role].map(([title, route]: any) => (
                <MenuItem key={title} onClick={handleCloseNavMenu}>
                  <TextLink to={route} variant='body'>{title}</TextLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>


          <TextLink to='/' variant='h6' sx={{ display: { xs: 'block', md: 'none' } }}>InterLink Meetup</TextLink>

          <Box sx={{ flexGrow: { xs: 1, md: 0 } }}></Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mt: 0.4 }}>
            {navLinks[user.role].map(([title, route]: any) => (
              <TextLink key={title} sx={{ ml: 2 }} to={route}>{title}</TextLink>
            ))}
          </Box>

          {user.authenticated ?
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleOpenUserMenu}>
                <Typography variant='subtitle2' sx={{ mr: 1 }}>{user.displayName}</Typography>
                <Tooltip title="Open settings">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar>{stringAvatarName(user.displayName)}</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem sx={{ width: '200px' }} onClick={handleCloseUserMenu}>
                  <Avatar sx={{ mr: 2 }} /> Профіль
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                  dispatch(logout(window.location.pathname));
                  handleCloseUserMenu();
                }}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Вийти
                </MenuItem>
              </Menu>
            </Box>
            : (window.location.pathname.includes('login')
              ?
              <Box></Box>
              : <Button component={Link} to='/login' color='inherit'>Увійти</Button>)
          }


        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
