import {makeStyles} from '@material-ui/core/styles';
import {alpha} from "@mui/material/styles";


const useStyle = makeStyles((theme) => ({
    navbar: {
        // background: 'linear-gradient(45deg, #1cb5e0 30%, #021b79 90%)',
        backgroundColor: "#111827FF",
        '& a': {
            color: '#ffffff',
            marginLeft: 10,
        },
    },
    globalText:{
        fontWeight: 'bold',
        fontSize: '2rem',
        color: '#111827FF'
    },
    brand: {
        fontWeight: 'bold',
        fontSize: '2rem',
    },
    brandR: {
        color: '#faaf00'
    },
    gridMenu: {
        color: '#ffffff',
    },
    mt1: {marginTop: '1rem'},
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
    cartBtns: {
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
        margin: "5rem 0 1rem 0"
    },
    btn: {
        margin: "5px"
    },
    iconSvg: {
        color: "#F6F9FC",
    },
    badge: {
        color: "#F6F9FC",
    },
    priceFavoriteIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 0
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
        // height: "8"
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
        color: '#ffffff',
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
    //GlobalColor
    globalColor: {
        color: '#203040'
    },
    globalColorYellow: {
        background: '#eeeeee'
    },
    // advertising
    advertisingH1: {
        fontSize: "3rem",
        fontWeight: "bold",
        color: '#203040'
    },

    //ShopTitle
    shopTitle: {
        color: '#203040',
        fontSize: 16,
        fontWeight: 400
    },

    //TypographyH1
    typographyh1: {
        fontSize: '2.2rem',
        color: '#203040'
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
    menuButton: {padding: 0},


//    Hero
    hero: {
        height: "80vh"
    },

//    Advertising
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
        color: '#919EAB',
        cursor: 'pointer',
        transition: ".2s all",
        '&:hover': {
            color: "#DC143C",
        }
    },
//    SubMenu
    subMenu: {
        display: "flex",
        flexDirection: "column"
    },
    //    GlobalFlex
    flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    flexCenter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start"
    },
    flex1: {
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
    },
    //Categories
    categoryChildren: {
        padding: 10,
        display: "flex",
        alignItems: "start",
        justifyContent: "space-between"
    },
    cardActionArea: {
        marginTop: 60,
        width: 300,
        height: 300,
    },
// ProductDiscount
    productDiscount: {
        position: "absolute",
        backgroundColor: "#f0c000",
        padding: 5,
        color: "#ffffff",
        fontSize: "1em",
        top: 10,
        left: 0,
    },


    //ProductImage
    productImage: {
        width: "100%",
        height: 350,
    },
//    SizeProducts
    sizeProducts: {
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #e8e8e8",
        boxShadow: "inset 0 0 0 1px #fff",
        textAlign: "center",
        whiteSpace: "nowrap",
        textTransform: "uppercase",
        cursor: "pointer",
        padding: "6px 14px 8px",
        borderRadius: 4,
        transition: ".2s all",
        marginRight: 5,
        "&:hover": {
            backgroundColor: "#e8e8e8",
        }
    },

    // marginTopGlobal
    marginTopGlobal: {
        marginTop: '5.4rem'
    },

    // CommentDataYear
    dataYear: {
        fontSize: 12,
        color: "gray",
        paddingLeft: 5
    },

    // globalColorStyle

    globalColorStyle: {
        color: "#bdbdbd",
        cursor: "pointer",
        fontSize: 31,
        transition: '.4 all',
        "&:hover": {
            color: 'crimson'
        }
    },

// childComment
    childComment: {
        padding: "0 10px",
        marginLeft: "3rem",
        borderRadius: 5
    },
    //globalStyleImage

    globalStyleImage: {
        width: "100%",
        borderRadius: 5
    },
    // Address Location

    address: {
        border: "1px solid blue",
        padding: '10px',
        borderRadius: 5
    },
    reviewItem: {
        marginTop: '1.5rem',
        marginRight: '4rem',
        borderRight: '1px #808080 solid',
    },
    delivery: {
        fontSize: 16,
        fontWeight: 500,
        marginTop: 10,
        border: '1px solid rgba(0,150,136,0.56)',
        color: 'rgba(0,150,136,0.95)',
        padding: "5px 10px",
        borderRadius: 5,
        cursor: 'pointer',
    },
    exclamatory: {
        fontSize: "14px",
        border: '1px solid red',
        textAlign: 'center',
        color: "red",
        padding: '4px 10px',
        borderRadius: "50%"
    },
    payCartTitle: {
        fontSize: '.7rem'
    }

}))

export default useStyle;

