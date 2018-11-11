import React from 'react'
import { SwitchNavigator } from 'react-navigation'
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

// import the different screens
import Navigation from './Navigation/Navigation'
import Loading from './Components/Login/Loading'
import Login from './Components/Login/Login'

const Navigator = SwitchNavigator(
    {
        Loading,
        Login,
        Navigation
    },
    {
        initialRouteName: 'Loading'
    }
);

export default class App extends React.Component {

    componentDidMount() {
        if (SplashScreen != undefined)
            SplashScreen.hide()
    }

    render() {
        return (
            <Provider store={Store}>
                <Navigator />
            </Provider>
        )
    }
}