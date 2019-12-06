/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "components/CustomButtons/Button.js";
import Poppers from "@material-ui/core/Popper";
import Person from "@material-ui/icons/Person";
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function AdvertisementPopper(props) {
    const classes = useStyles();
    const [openProfile, setOpenProfile] = React.useState(null);

    const handleClickProfile = event => {
        if (openProfile && openProfile.contains(event.target)) {
            setOpenProfile(null);
        } else {
            setOpenProfile(event.currentTarget);
        }
    };
    const handleCloseProfile = () => {
        setOpenProfile(null);
    };
    const whiteFontClasses = classNames({
        [" " + classes.whiteFont]: activeRoute(props.layout + props.path)
    });
    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    }
    const listItemClasses = classNames({
        [" " + classes[props.color]]: activeRoute(props.layout + props.path)
    });
    return (

        <div>
            <div className={classes.manager}>
                <Button
                    color="black"
                    aria-owns={openProfile ? "profile-menu-list-grow" : null}
                    aria-haspopup="true"
                    onClick={handleClickProfile}
                    className={classes.buttonLink}>
                    <Person className={classes.icons} />
                    <p className={classes.linkText}>Profile</p>
                </Button>
                <Poppers
                    open={Boolean(openProfile)}
                    anchorEl={openProfile}
                    transition
                    disablePortal
                    className={
                        classNames({ [classes.popperClose]: !openProfile }) +
                        " " +
                        classes.popperNav
                    }>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="profile-menu-list-grow"
                            style={{
                                transformOrigin:
                                    placement === "bottom" ? "center top" : "center bottom"
                            }}>
                            <ClickAwayListener onClickAway={handleCloseProfile}>
                                <MenuList role="menu">
                                    <MenuItem
                                        onClick={handleCloseProfile}
                                        className={classes.dropdownItem}>
                                        {/*  */}
                                        <NavLink
                                            to={'/admin/advertisements'}
                                            className={classes.item}
                                            activeClassName="active"
                                            key={1}
                                        >
                                            <ListItem button className={classes.itemLink + listItemClasses}>
                                                <ListItemText
                                                    primary={'Publish an Advertisement'}
                                                    className={classNames(classes.itemText, whiteFontClasses, {
                                                        [classes.itemTextRTL]: props.rtlActive
                                                    })}
                                                    disableTypography={true}
                                                />
                                            </ListItem>
                                        </NavLink>
                                        {/*  */}
                                    </MenuItem>
                                    <Divider dark />
                                    <MenuItem
                                        onClick={handleCloseProfile}
                                        className={classes.dropdownItem}>
                                        {/*  */}
                                        <NavLink
                                            to={'/admin/advertisements'}
                                            className={classes.item}
                                            activeClassName="active"
                                            key={1}
                                        >
                                            <ListItem button className={classes.itemLink + listItemClasses}>
                                                <ListItemText
                                                    primary={'View Your Advertisements'}
                                                    className={classNames(classes.itemText, whiteFontClasses, {
                                                        [classes.itemTextRTL]: props.rtlActive
                                                    })}
                                                    disableTypography={true}
                                                />
                                            </ListItem>
                                        </NavLink>
                                        {/*  */}
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Grow>
                    )}
                </Poppers>
            </div>
        </div>
    );
}

AdvertisementPopper.propTypes = {
    rtlActive: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
    logo: PropTypes.string,
    image: PropTypes.string,
    logoText: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool
};

