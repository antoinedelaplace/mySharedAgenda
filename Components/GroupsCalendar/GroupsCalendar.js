import React from 'react'
import { View, FlatList, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { List, ListItem, Icon } from 'react-native-elements'


class GroupsCalendar extends React.Component {

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
                        name='add-to-list'
                        type='entypo'
                        color='#fff'
                        onPress={() => navigation.navigate('AddGroup')}
                    />
                </View>
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            groups: []
        };
        this._openCalendar = this._openCalendar.bind(this);
        this._renderRow = this._renderRow.bind(this);
    }


    componentDidMount() {
        this._getGroupsSharedCalendars();
        const { navigation } = this.props;
        navigation.addListener('willFocus', () =>
            this.reloadCalendars()
        );
    }


    reloadCalendars() {
        this.setState({ groups: undefined });
        this._getGroupsSharedCalendars()
    }

    _getGroupsSharedCalendars() {
        let group;
        let groups = [];

        for (let i = 0; i < this.props.calendarReducer.calendars.length; i++) {
            if (this.props.calendarReducer.calendars[i].id.split("@")[1] == "group.calendar.google.com"
                && this.props.calendarReducer.calendars[i].summary != "Famille") {
                group = {
                    summary: this.props.calendarReducer.calendars[i].summary,
                    id: this.props.calendarReducer.calendars[i].id,
                    description: this.props.calendarReducer.calendars[i].description,
                    color: this.props.calendarReducer.calendars[i].backgroundColor
                };
                groups.push(group);
            }
        }
        this.setState({ groups: groups });
    }

    _openCalendar(id, summary) {
        this.props.navigation.navigate('GroupCalendarView', { calendarId: id, calendarName: summary });
    }

    _renderRow({ item }) {
        return (
            <ListItem
                leftIcon={{ name: "group", color: item.color }}
                title={item.summary}
                subtitle={item.description}
                onPress={() => this._openCalendar(item.id, item.summary)}
            />
        )
    }

    render() {
        return (
            <ScrollView>
                <List
                    containerStyle={{ marginTop: -1, }}
                    >
                    <FlatList
                        data={this.state.groups}
                        keyExtractor={(item) => item.id}
                        renderItem={this._renderRow}
                    />
                </List>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    iconLeftStyle: {
        marginLeft: 15,
    },
    iconRightStyle: {
        marginRight: 15,
    }
})

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(GroupsCalendar)