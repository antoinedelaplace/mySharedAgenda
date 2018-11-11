// Login.js

import React from 'react'
import { googleLogin } from '../Google/login/googleLogin'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
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
                <Text style={styles.mainTitle}>
                    Welcome to MySharedAgenda Application !
                </Text>
                <Button
                    icon={{
                        name: 'google',
                        type: 'font-awesome',
                        size: 18
                    }}
                    onPress={() => this._login()}
                    title="Login Google"
                    buttonStyle={{
                        justifyContent: "center",
                        backgroundColor: "#d34836",
                        width: 200,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 20
                    }} />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    mainTitle: {
        margin: 20
    }
});

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(Login)