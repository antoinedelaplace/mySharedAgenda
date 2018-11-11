import React from 'react'
import { View, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { addUserCalendar } from '../../Google/calendar/googleCalendar'

class AddGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            summary: "",
            isLoading: false
        };
        this._createCalendar = this._createCalendar.bind(this);
    }

    _createCalendar() {
        this.setState({ isLoading: true });
        addUserCalendar(this.props.userReducer.user.accessToken, this.state.name, this.state.summary).then(data => {
            const action = { type: "ADD_CALENDAR", value: data };
            this.props.dispatch(action);
            this.props.navigation.navigate('GroupsCalendar');
        });
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom du groupe"
                        returnKeyType="next"
                        onSubmitEditing={() => this.descriptionInput.focus()}
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name} />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        keyboardType="default"
                        ref={(input) => this.descriptionInput = input}
                        onChangeText={(summary) => this.setState({ summary })}
                        value={this.state.summary} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonStyle={styles.buttonStyle}
                        icon={{
                            name: 'add',
                            type: 'material-icons',
                            size: 18
                        }}
                        onPress={this._createCalendar}
                        title="Créer le groupe"
                        disabled={this.state.isLoading}
                    />
                </View>
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        //backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        marginBottom: 10,
        backgroundColor: '#F39C12',
        borderColor: 'transparent',
        width: 170,
        borderRadius: 10,
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 35,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(AddGroup)