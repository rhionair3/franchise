import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@material-ui/core/';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Menulist } from './MainMenu';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  iconEdit: {
    margin: theme.spacing.unit * 2,
    color: 'rgba(63, 195, 128, 1)',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class CartList extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            carts: [],
            header: "",
            status: "",
            open : true

        };
    }
    componentDidMount() {
		  fetch('http://13.250.218.2:8080/franchise/api/v1/cart/list').then(response => {
            return response.json();
      }).then(result => {
        this.setState({
            carts: result.data,
            owner: result.code,
            status: result.result
          });
      });
	  }
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)} >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames( classes.menuButton, this.state.open && classes.menuButtonHidden, )} >
                <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} >
                CartList
                </Typography>
                <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                </Badge>
                </IconButton>
            </Toolbar>
            </AppBar>
            <Drawer variant="permanent" classes={{ paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose), }} open= {this.state.open} >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>{Menulist}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Typography variant="h5" gutterBottom component="h5">
                    Owner Code : { this.state.owner }
                </Typography>
                <Typography variant="h5" gutterBottom component="h5">
                    Status Request : { this.state.status }
                </Typography>
                <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Code</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Setting</TableCell>
                        </TableRow>
                    </TableHead>
                    < TableBody >
                            {
                                this.state.carts.map(function(item, key) {
                                    return (
                                    <TableRow key = {key}>
                                        <TableCell align="right">{item.id}</TableCell>
                                        <TableCell align="right">{item.code}</TableCell>
                                        <TableCell align="right">{item.status}</TableCell>
                                        <TableCell align="right"><Icon className={classes.iconEdit} color="error">create</Icon></TableCell>
                                    </TableRow>
                                    )
                                })
                            }
                    </TableBody>
                </Table>
                </Paper>
            </main>
        </div>
        );
    }
}

CartList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CartList);