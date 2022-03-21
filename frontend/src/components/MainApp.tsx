import { useAppSelector } from "../store/configureStore";
import { login, LoginProps } from "../reducers/auth";

import LoginView from './login';
import WelcomeView from './welcome';

export default function MainView(){

    const {serverPath} = useAppSelector(state => state.auth);

    return serverPath?<WelcomeView serverPath={serverPath} />:<LoginView/>;

}