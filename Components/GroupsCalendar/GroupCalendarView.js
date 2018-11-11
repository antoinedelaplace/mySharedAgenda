import React from 'react'
import { View, StyleSheet, NavButton } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import AgendaView from '../AgendaView'


class GroupCalendarView extends React.Component {

    /**
     * Utiliser pour modifier le header de la barre de navigation en haut de la page
     * @param navigation
     * @returns {{headerRight: XML}}
     */
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <View style={styles.iconRightStyle}>
                    <Icon
                        name="settings"
                        color="#fff"
                        onPress={() => navigation.navigate("ManageCalendarView", {
                            calendarId: navigation.state.params.calendarId,
                            calendarName: navigation.state.params.calendarName
                        })}
                    />
                </View>
            ),
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <AgendaView
                    calendarId={this.props.navigation.state.params.calendarId}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    iconRightStyle: {
        marginRight: 15,
    }
});

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(GroupCalendarView)