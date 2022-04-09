import {combineReducers} from "redux";
import {CartReducer} from "./cartReducer";
import {FavoriteReducer} from "./favoriteReducer";
import {ModeReducer} from "./modeReducer";
import {LoginReducer} from "./loginReducer";
import {PaymentMethodReducer} from "./paymentReducer";
import {ChangeUserReducer} from "./changeUserReducer";

export default combineReducers({
     cart: CartReducer,
     favorite: FavoriteReducer,
     mode: ModeReducer,
     user: LoginReducer,
     payment: PaymentMethodReducer,
     changeUser: ChangeUserReducer,
})