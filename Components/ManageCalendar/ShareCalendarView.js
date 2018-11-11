import React from 'react'
import { View, TextInput, Text, Picker, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { shareCalendar } from '../../Google/calendar/googleCalendar'

class ShareCalendarView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            role: "",
            isLoading: false
        };
        this._shareCalendar = this._shareCalendar.bind(this);
    }

    _shareCalendar() {
        this.setState({ isLoading: true });
        shareCalendar(this.props.userReducer.user.accessToken,
            this.props.navigation.state.params.calendarId,
            { "type": "user", "value": this.state.mail },
            this.state.role).then(data => {
                this.props.navigation.navigate("ManageCalendarView", {
                    calendarId: this.props.navigation.state.params.calendarId,
                    calendarName: this.props.navigation.state.params.calendarName
                });
            });
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
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
                        placeholder="Adresse email"
                        returnKeyType="next"
                        keyboardType="email-address"
                        onChangeText={(mail) => this.setState({ mail })}
                        value={this.state.mail} />
                    <Text
                        style={styles.roleTextStyle}
                        placeholder="Role">Attribuer un rôle spécifique à cet utilisateur
                        </Text>
                    <Picker
                        selectedValue={this.state.role}
                        style={styles.pickerStyle}
                        onValueChange={(itemValue, itemIndex) => this.setState({ role: itemValue })}>
                        <Picker.Item label="Reader" value="reader" />
                        <Picker.Item label="Writer" value="writer" />
                        <Picker.Item label="Owner" value="owner" />
                    </Picker>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonStyle={styles.buttonStyle}
                        icon={{
                            name: 'share',
                            type: 'material-icons',
                            size: 18
                        }}
                        onPress={this._shareCalendar}
                        title="Partager"
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
    roleTextStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerStyle: {
        height: 70,
        width: 150,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        marginBottom: 10,
        backgroundColor: '#F39C12',
        borderColor: 'transparent',
        width: 120,
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

export default connect(mapStateToProps)(ShareCalendarView)