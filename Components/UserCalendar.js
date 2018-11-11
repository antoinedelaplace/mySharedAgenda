import React from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { List, ListItem } from 'react-native-elements'

class UserCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this._renderRow = this._renderRow.bind(this);
    }

    componentDidMount() {
        this._getUsersSharedCalendars();
    }

    _getUsersSharedCalendars() {
        let user;
        for (let i = 0; i < this.props.calendarReducer.calendars.length; i++) {
            if (this.props.calendarReducer.calendars[i].id.split("@")[1] == "gmail.com" &&
                this.props.calendarReducer.calendars[i].id != this.props.userReducer.user.user.email) {
                user = {
                         summary: this.props.calendarReducer.calendars[i].summary,
                         id: this.props.calendarReducer.calendars[i].id,
                         description: this.props.calendarReducer.calendars[i].description,
                         color: this.props.calendarReducer.calendars[i].backgroundColor
                       };
                this.setState({ users: [...this.state.users, user] });
            }
        }
    }

    _openCalendar(id) {
        this.props.navigation.navigate('CalendarView', { calendarId: id, calendarName: id });
    }

    _renderRow ({ item }) {
        return (
            <ListItem
                leftIcon={{name: "user", type: "font-awesome", color: item.color}}
                title={item.id}
                onPress={() => this._openCalendar(item.id)}
            />
        )
    }

    render() {
        return (
            <ScrollView>
                <List>
                    <FlatList
                        data={this.state.users}
                        keyExtractor={(item) => item.id}
                        renderItem={this._renderRow}
                    />
                </List>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(UserCalendar)