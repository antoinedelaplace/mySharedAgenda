import React from 'react'
import { View, StyleSheet, FlatList, ScrollView } from 'react-native'
import { Button, Text, List, ListItem, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { googleSignOut } from '../Google/login/googleLogin'
import { sendInvitation } from '../Invites/Invitation'

class Settings extends React.Component {

    constructor(props) {
        super(props);
        //Bind this
        this._googleSignOut = this._googleSignOut.bind(this);
        this._renderRow = this._renderRow.bind(this);
    }

    _googleSignOut() {
        googleSignOut().then(data => {
            this.setState({
                user: undefined
            });
            const action = { type: "REMOVE_USER", value: undefined };
            this.props.dispatch(action);
            const actionCalendar = { type: "UNSET_CALENDARS", value: undefined };
            this.props.dispatch(actionCalendar);
            this.props.navigation.navigate('Login');
        });
    }

    _renderRow({ item }) {
        return (
            <ListItem
                leftIcon={{ name: "group", color: item.color }}
                title={item.summary}
                subtitle={item.description}
                onPress={() => this.props.navigation.navigate("ManageCalendarView", {
                    calendarId: item.id,
                    calendarName: item.summary
                })
                }
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.infoUserContainer}>
                    <Text style={styles.titleStyle}>Informations personnelles</Text>
                    <Text style={{ paddingTop: 2, }}>{this.props.userReducer.user.user.email}</Text>
                    <Text style={{ paddingTop: 2, }}>{this.props.userReducer.user.user.givenName}</Text>
                    <Text style={{ paddingTop: 2, }}>{this.props.userReducer.user.user.familyName}</Text>
                </View>
                <View style={styles.mycalendarContainer}>
                    <Text style={styles.titleStyle}>Mes calendriers</Text>
                    <ScrollView>
                        <List style={styles.flatListStyle}>
                            <FlatList
                                data={this.props.calendarReducer.calendars}
                                keyExtractor={(item) => item.id}
                                renderItem={this._renderRow}
                            />
                        </List>
                    </ScrollView>
                </View>
                <View style={styles.actionFooterContainer}>
                    <Text style={styles.titleStyle}>Inviter qui vous le souhaitez</Text>
                    <Button
                        buttonStyle={styles.buttonStyle1}
                        icon={{
                            name: 'share',
                            size: 18
                        }}
                        onPress={sendInvitation}
                        title="Inviter"
                    />
                    <Text style={styles.titleStyle}>Déconnexion</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonStyle={styles.buttonStyle2}
                        onPress={this._googleSignOut}
                        title="Déconnexion"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoUserContainer: {
        paddingBottom: 10,
        //flex: 1,
    },
    mycalendarContainer: {
        flex: 1,
        paddingBottom: 10,
    },
    titleStyle: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle1: {
        marginBottom: 10,
        backgroundColor: '#F39C12',
        borderColor: 'transparent',
        width: 100,
        borderRadius: 10,
    },
    buttonStyle2: {
        marginBottom: 10,
        backgroundColor: '#F39C12',
        borderColor: 'transparent',
        width: 130,
        borderRadius: 10,
    },
    flatListStyle: {
        marginTop: 0,
    },
    actionFooterContainer: {

    },
    buttonContainer: {

    }
});

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(Settings)