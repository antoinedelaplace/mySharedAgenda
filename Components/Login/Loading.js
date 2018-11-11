// Loading.js

import React from 'react'
import { googleLogin } from '../../Google/login/googleLogin'
import { connect } from 'react-redux'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        };
    }

    componentDidMount() {
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
            <View style={styles.container}>
                <Text style={{ fontSize: 15, }}>it's coming... (Loading)</Text>
                <ActivityIndicator style={styles.loadingIcon} size='large' color='orange' />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return state
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIcon: {
        marginTop: 20,
    }
});

export default connect(mapStateToProps)(Loading)