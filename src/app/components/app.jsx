import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, logoutUser } from '../actions/firebase_actions';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import HomeIcon from 'material-ui-icons/Home';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';

import 'typeface-roboto'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            anchorEl: undefined,
            userMenuOpen: false,
        };
        this.props.fetchUser();
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        this.props.logoutUser().then((data) => {
      // reload props from reducer
            this.props.fetchUser();
        });
    }
      handleRequestClose () {
        this.setState({ open: false });
      };

    renderUserMenu(currentUser) {
    // if current user exists and user id exists than make user navigation
        if (currentUser && currentUser.uid) {
            return (
                <div>
                <Button 
                    aria-owns="simple-menu" 
                    aria-haspopup="true" 
                    onClick={(event) =>  this.setState({ userMenuOpen: true, anchorEl: event.currentTarget })} 
                    contrast>
                  {currentUser.email}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={this.state.userMenuOpen}
                  onRequestClose={()=>this.setState({ userMenuOpen: false })}
                >
                  <MenuItem onClick={()=>this.setState({ userMenuOpen: false })}>
                    <Link to="/profile">Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={()=>this.setState({ userMenuOpen: false })}>
                    <Link to="/logout" onClick={this.logOut}>Logout</Link>
                  </MenuItem>
                </Menu>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to="/login"><Button to="/login" contrast>Login</Button></Link>
                    <Link to="/register"><Button contrast>Register</Button></Link>
                </div>
            );
        }
    }

    handleLeftClose = () => this.toggleDrawer('left', false);

    render() {
        const sideList = (
          <div>
            <List disablePadding>
            <div>
                <Link to="/">
                    <ListItem button>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItem>
                </Link>
            </div>
            </List>
          </div>
        );
        return (
            <div>
                <AppBar>
                    <Toolbar>
                      <IconButton contrast>
                        <MenuIcon onClick={() => this.setState({drawerOpen: true})} />
                      </IconButton>
                        <Typography type="title" colorInherit>
                            Firebase & Redux boilerplate
                        </Typography>
                        { this.renderUserMenu(this.props.currentUser) }
                    </Toolbar>
                </AppBar>
                <Drawer
                  open={this.state.drawerOpen}
                  onRequestClose={() => this.setState({drawerOpen: false})}
                  onClick={() => this.setState({drawerOpen: false})}
                >
                {sideList}
                </Drawer>
                <Grid container gutter={24}>
                    <Grid item xs={12}>
                    {this.props.children}
                    </Grid>
                </Grid>            
        </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser, logoutUser }, dispatch);
}


function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
