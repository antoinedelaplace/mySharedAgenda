import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addUserCalendar } from '../Google/calendar/googleCalendar'
import AgendaView from './AgendaView'
import { Icon } from 'react-native-elements'

class FamilyCalendar extends React.Component {

    /**
     * Utiliser pour modifier le header de la barre de navigation en haut de la page
     * @param navigation
     * @returns {{headerRight: XML}}
     */
    static navigationOptions = ({ navigation }) => {
        if (navigation.state && navigation.state.params && navigation.state.params.calendarId) {
            return {
                headerRight: <View style={styles.iconStyle}><Icon
                    name="settings"
                    color="#fff"
                    onPress={() => navigation.navigate("ManageCalendarView", {
                        calendarId: navigation.state.params.calendarId
                    })
                    }>
                </Icon></View>
            }
        }
    };

    constructor(props) {
        super(props);

        //Name of Family's calendar
        this.familyCalendarName = "Famille";

        //Family's events
        this.state = {
            calendarId: undefined
        };
    }

    componentDidMount() {
        let calendarFamily = this._getFamilyCalendar();

        //Si le calendrier n'est pas créé alors on le créer
        if (calendarFamily == undefined)
            this._addFamilyCalendar();
    }

    _updateNavigationParams(id) {
        this.props.navigation.setParams({
            calendarId: id
        });
        this.setState({
            calendarId: id
        });
    }

    _addFamilyCalendar() {
        addUserCalendar(this.props.userReducer.user.accessToken, this.familyCalendarName).then(data => {
            const action = { type: "ADD_CALENDAR", value: data };
            this.props.dispatch(action);
            this._updateNavigationParams(data.id);
        });

    }

    _getFamilyCalendar() {
        for (let i = 0; i < this.props.calendarReducer.calendars.length; i++) {
            if (this.props.calendarReducer.calendars[i].summary == this.familyCalendarName) {
                this._updateNavigationParams(this.props.calendarReducer.calendars[i].id);
                return (this.props.calendarReducer.calendars[i]);
            }
        }
        return (undefined);
    }

    render() {
        return (
            <View style={styles.container}>
                <AgendaView
                    calendarId={this.state.calendarId}
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
    iconStyle: {
        marginRight: 15,
    }
});

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(FamilyCalendar)