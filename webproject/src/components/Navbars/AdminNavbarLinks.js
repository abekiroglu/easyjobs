import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import BusinessIcon from '@material-ui/icons/Business';
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks(props) {
  const classes = useStyles();


  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  function generateLink(props, classes, key, isDropdownItem) {
    var listItemClasses;
    var activePro = " ";
    if (props.path === "/logout") {
      activePro = classes.activePro + " ";
      listItemClasses = classNames({
        [" " + classes['red']]: true
      });
    } else {
      listItemClasses = classNames({
        [" " + classes['blue']]: activeRoute(props.layout + props.path)
      });
    }
    const whiteFontClasses = classNames({
      [" " + classes.whiteFont]: activeRoute(props.layout + props.path)
    });

    return (
      <NavLink
        to={props.layout + props.path}
        className={activePro + classes.item}
        activeClassName="active"
        key={key}>
        <ListItem button className={classes.itemLink + listItemClasses}>
          {!isDropdownItem ? <props.icon
            className={classNames(classes.itemIcon, whiteFontClasses, {
              [classes.itemIconRTL]: props.rtlActive
            })} /> : null}
          <ListItemText
            primary={props.name}
            className={classNames(classes.itemText, whiteFontClasses, {
              [classes.itemTextRTL]: props.rtlActive
            })}
            disableTypography={true}
          />
        </ListItem>
      </NavLink>
    );

  }

  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);

  const handleClickNotification = event => {

    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = (e) => {
    setOpenNotification(null);
  };
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

  if (props[0].layout === '/admin') {
    return (
      <div>
        <div className={classes.manager}>
          {generateLink(props[0], classes, 1, false)}
        </div>
        <div className={classes.manager}>
          {generateLink(props[1], classes, 2, false)}
        </div>
        <div className={classes.manager}>
          <Button
            color={"white"}
            justIcon={true}
            simple={"false"}
            aria-owns={openNotification ? "notification-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickNotification}
            className={classes.buttonLink}
          >
            <ChromeReaderModeIcon className={classes.icons} />
            <p onClick={handleCloseNotification} className={classes.linkText} style={{ textTransform: 'capitalize' }}>
              Advertisements
          </p>
          </Button>
          <Poppers
            open={Boolean(openNotification)}
            anchorEl={openNotification}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !openNotification }) +
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="notification-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseNotification}>
                    <MenuList role="menu">
                      <MenuItem
                        //onClick={handleCloseNotification}
                        className={classes.dropdownItem}
                      >
                        {generateLink(props[2], classes, 3, true)}
                      </MenuItem>
                      <MenuItem
                        //onClick={handleCloseNotification}
                        className={classes.dropdownItem}
                      >
                        {generateLink(props[3], classes, 4, true)}
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
        <div className={classes.manager}>
          {generateLink(props[4], classes, 5, false)}
        </div>
        <div className={classes.manager}>
          {generateLink(props[5], classes, 6, false)}
        </div>
        <div className={classes.manager}>
          {generateLink(props[6], classes, 7, false)}
        </div>
        {/* <div className={classes.manager}>
          <Button
            color={"white"}
            justIcon={"false"}
            simple={"false"}
            aria-owns={openProfile ? "profile-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickProfile}
            className={classes.buttonLink}
          >
            <BusinessIcon className={classes.icons} />
            <p className={classes.linkText} style={{ textTransform: 'capitalize' }}>Company Profile</p>
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
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseProfile}>
                    <MenuList role="menu">
                      <MenuItem
                        //onClick={handleCloseNotification}
                        className={classes.dropdownItem}
                      >
                        {generateLink(props[2], classes, 1, true)}
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div> */}
      </div>
    );
  } else {
    return (
      <div>
        <div className={classes.manager}>
          {generateLink(props[0], classes, 1, false)}
        </div>
        <div className={classes.manager}>
          {generateLink(props[1], classes, 2, false)}
        </div>
        <div className={classes.manager}>
          {generateLink(props[2], classes, 3, false)}
        </div>
      </div>
    );
  }

}
