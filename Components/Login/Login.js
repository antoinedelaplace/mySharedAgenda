// Login.js

import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { googleLogin } from '../../Google/login/googleLogin'
import { connect } from 'react-redux'

class Login extends React.Component {

    constructor(props) {
        super(props);
        //Bind this
        this._login = this._login.bind(this);
    }

    _login() {
        googleLogin().then(data => {
            this.setState({
                user: data
            });
            const action = { type: "ADD_USER", value: this.state.user };
            this.props.dispatch(action);
            this.props.navigation.navigate(data ? 'MyCalendar' : 'Login');
        });
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../Images/launchscreen.png')}></Image>
                    <Button
                        icon={{
                            name: 'google',
                            type: 'font-awesome',
                            size: 18
                        }}
                        onPress={() => this._login()}
                        title="Login Google"
                        buttonStyle={{
                            marginTop: 20,
                            backgroundColor: "#C97C00",
                            width: 170,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 10
                        }} />
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerContent}>An app made MySharedAgenda using React Native Ⓒ Copyright AFY</Text>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f39c12',
    },
    logoContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 150,
        height: 150,
    },
    footerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerContent: {
        fontSize: 12,
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
        width: 300,
        opacity: 0.85,
    },
});

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(Login)