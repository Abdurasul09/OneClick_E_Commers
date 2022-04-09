import {makeStyles} from '@material-ui/core/styles';
import {alpha} from "@mui/material/styles";


const useStyle = makeStyles((theme) => ({
    navbar: {
        padding: "10px 0",
    },
    cardImage: {
        width: "100%",
        height: "210px",
        padding: "10px",
        objectFit: "cover",
        borderRadius: "5px"
    },
    grow: {
        flexGrow: "2"
    },
    card: {
        marginTop: "2rem"
    },
    cartBtns:{
        width: "10px"
    },
    cardTitleIcon: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    section: {
        marginTop: "6rem"
    },
    btns: {
        margin: "10px 0 3rem 0"
    },
    btn: {
        margin: "5px"
    },
    iconSvg: {
        color: "#F6F9FC",
        marginRight: "5px",
    },
    badge: {
        color: "#F6F9FC",
    },
    priceFavoriteIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    cartScreen: {
        marginTop: "7rem"
    },
    cartQuantity: {
        margin: "10px",
        fontSize: "18px",
    },
    form: {
        width: '100%',
        maxWidth: "500px",
        margin: "0 auto",
        height: "70vh"
    },
    loginBtn: {
        marginTop: "7rem",
    },
    navbarBtn: {
        color: "#fff",
        textTransform: "initial",
    },
    step: {
        display: "flex",
        justifyContent: "center",
        margin: "20px 0"
    },
    stepLabel: {
        margin: "1rem 4rem",
    },
    transparentBackground: {
        backgroundColor: 'transparent',
    },
    placeOrder: {
        marginTop: "1rem"
    },
    icon: {
        fontSize: "25px"
    },
    burger: {
        fontSize: "30px",
    },
    searchSection: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    searchForm: {
        width: "400px",
        border: 'none',
        backgroundColor: alpha(theme.palette.common.white, 0.20),
        borderRadius: "5px",
    },
    searchInput: {
        border: "none",
        background: "none",
        outline: "none",
        width: "360px",
        paddingLeft: "5px",
        padding: "10px",
        color: '#fff',
        '&::placeholder': {
            color: alpha(theme.palette.common.white, .9),
        },
    },
    iconButton: {
        padding: "6px",
        borderRadius: "4px",
        color: '#fff',
    },
    navbarButton: {
        textTransform: 'initial',
    },
    textField: {
        height: "60px",
        "&::label": {
            padding: "30px",
            margin: "0"
        }
    },

    reviewForm: {
        maxWidth: 800,
        width: '100%',
    },
    reviewItem: {
        marginRight: '1rem',
        borderRight: '1px #808080 solid',
        paddingRight: '1rem',
    },

    // Burger menu Ul
    menu: {
        borderRadius: "50px",
        padding: "0 10px",
        height: "55px",
    },
    proFileBtns: {
        marginTop: "6rem"
    },
    profileItems: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },


// Menu
    submenu: {
        marginTop: theme.spacing(-14.5),
        marginLeft: "5px"
    },
    title: {
        flexGrow: 5,
    },
    moreArrow: {
        marginRight: theme.spacing(10),
    },
    cascadingSubmenu: {
        marginRight: "10px",
    },

//    Hero
    hero: {
        height: "80vh"
    },

//    Adversitings
    adversitings: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },

    bg: {
        backgroundColor: 'red'
    },

    profileTypography: {
        fontSize: 14,
        letterSpacing: 1,
        fontWeight: 300
    },
    deleteProfile: {
        marginTop: "2rem"
    },

//    Modal
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        backgroundColor: '#F6F9FC',
        border: 'none',
        boxShadow: 24,
        padding: 10,
        borderRadius: 4
    },
//    FavoriteBorderIcon
    favoriteBorderIconHover: {
        '&:hover': {
            color: "#DC143C"
        }
    },
//    SubMenu
    subMenu: {
        display: "flex",
        flexDirection: "column"
    }
}))

export default useStyle;

