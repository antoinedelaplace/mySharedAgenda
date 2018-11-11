import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { getUserCalendarList, getUserCalendar, addUserEvent } from '../Google/calendar/googleCalendar'
import AgendaView from './AgendaView';
import AddEvent from './CalendarHandler/AddEvent';

/**
 * First View
 */
class MyCalendar extends React.Component {

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

        //Bind this
        this._getUserCalendarList = this._getUserCalendarList.bind(this);
        this.updateSelectedDate = this.updateSelectedDate.bind(this);

        //User's events
        this.state = {
            calendarId: undefined,
            selectedDate: null
        };
    }

    componentDidMount() {
        this._getUserCalendarList();
    }

    _updateNavigationParams(id) {
        this.props.navigation.setParams({
            calendarId: id
        });
        this.setState({
            calendarId: id
        });
    }

    _getUserCalendarList() {
        if (this.props.calendarReducer.calendars == undefined || this.props.calendarReducer.calendars.length == 0) {
            getUserCalendarList(this.props.userReducer.user.accessToken).then(data => {
                const action = { type: "GET_CALENDARS", value: data.items };
                this.props.dispatch(action);
                getUserCalendar(this.props.userReducer.user.accessToken, "primary").then(calendar => {
                    this._updateNavigationParams(calendar.id);
                });
            });
        }
    }

    updateSelectedDate(newDate) {
        this.setState(newDate);
    }

    render() {
        return (
            <View style={styles.container}>
                <AgendaView
                    calendarId={this.state.calendarId}
                    onUpdateDate={(newDate) => this.setState({selectedDate: newDate})}
                />
                <AddEvent
                    calendarId={this.state.calendarId}
                    selectedDate={this.state.selectedDate}
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
    addEventBtn: {
        paddingTop: 5,
        marginTop: 5
    },
    iconStyle: {
        marginRight: 15,
    }
});

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(MyCalendar)