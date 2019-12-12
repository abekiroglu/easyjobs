import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    IconButton,
    BottomNavigation,
    BottomNavigationAction
} from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '0 !important',
        maxWidth: '56px',
        minWidth: '30px',
        color: 'rgba(0, 0, 0, 0.2)'
    },
    selected: {
        color: 'rgb(162, 60, 182) !important'
    },
    wrapper: {
    }
}));

export default function SlideView(props) {
    const classes = useStyles();
    const { value, onChange, onNavigateBefore, onNavigateNext, view } = props;

    return (
        <div>
            {view}
            <BottomNavigation
                value={value}
                onChange={onChange}
                hideLabels
                classes={{ root: classes.wrapper }}
            >
                <IconButton onClick={onNavigateBefore}>
                    <NavigateBeforeIcon />
                </IconButton>
                <BottomNavigationAction
                    classes={{ root: classes.root, wrapper: classes.wrapper, selected: classes.selected }}
                    icon={<FiberManualRecordIcon />}
                    disabled={true} />
                <BottomNavigationAction
                    classes={{ root: classes.root, wrapper: classes.wrapper, selected: classes.selected }}
                    icon={<FiberManualRecordIcon />}
                    disabled={true} />
                <BottomNavigationAction
                    classes={{ root: classes.root, wrapper: classes.wrapper, selected: classes.selected }}
                    icon={<FiberManualRecordIcon />}
                    disabled={true} />
                <BottomNavigationAction
                    classes={{ root: classes.root, wrapper: classes.wrapper, selected: classes.selected }}
                    icon={<FiberManualRecordIcon />}
                    disabled={true} />
                <IconButton onClick={onNavigateNext}>
                    <NavigateNextIcon />
                </IconButton>
            </BottomNavigation>
        </div>
    );
}
