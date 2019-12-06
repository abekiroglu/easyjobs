import {
    successColor,
    whiteColor,
    grayColor,
    hexToRgb
} from "assets/jss/material-dashboard-react.js";

const aboutPageStyle = {
    aboutPageContainer: {
        position: "absolute",
        zIndex: "-1",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        display: "inline-block",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        "&:after": {
            position: "absolute",
            zIndex: "-1",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            content: '""',
            display: "block",
            background: 'black',
            opacity: ".75"
        }
    },
    headerBold: {
        color: grayColor[4],
        textAlign: 'center',
        fontWeight: 'bold'
    },
    header: {
        color: grayColor[5],
        textAlign: 'center'
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

export default aboutPageStyle;