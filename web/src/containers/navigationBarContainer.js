import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

import { getMe } from '../actions/company';


class NavigationBarContainer extends Component {
    constructor(props) {
        super(props);

    }


    componentDidMount() {
        const { getMe } = this.props;
        if (!this.props.company) {
            getMe();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} aria-label="Menu" color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit">{this.props.company ? `Welcome ${this.props.company.email}` : 'Loading...'}</Typography>

                    <section className={classes.rightToolbar}>
                        <IconButton color="inherit" aria-label="Edit">
                            <EditIcon />
                        </IconButton>
                        <IconButton color="inherit" aria-label="Save">
                            <SaveIcon />
                        </IconButton>
                        <IconButton color="inherit" aria-label="More Options">
                            <MoreVertIcon />
                        </IconButton>
                    </section>
                </Toolbar>
            </AppBar>
        );
    }
}


const styles = {
    // This group of buttons will be aligned to the right
    rightToolbar: {
        marginLeft: 'auto',
        marginRight: -12,
    },
    menuButton: {
        marginRight: 16,
        marginLeft: -12,
        outline: 'none'
    }
};

const mapStateToProps = state => {
    return {
        company: state.company.company,
        isLoading: state.company.isLoading,
        hasError: state.company.hasError,
        error: state.company.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMe: bindActionCreators(getMe.request, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavigationBarContainer));