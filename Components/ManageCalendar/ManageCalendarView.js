import React from 'react'
import { ScrollView, FlatList, StyleSheet, View, Text } from 'react-native'
import { List, ListItem, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { getAclForCalendar, removeUserCalendar } from '../../Google/calendar/googleCalendar'

class ManageCalendarView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this._renderRow = this._renderRow.bind(this);
        this._getSharedUsersOfGroup = this._getSharedUsersOfGroup.bind(this);
        this._deleteCalendar = this._deleteCalendar.bind(this);
    }

    componentDidMount() {
        this._getSharedUsersOfGroup();
        const { navigation } = this.props;
        navigation.addListener('willFocus', () =>
            this.reloadCalendars()
        );
    }

    reloadCalendars() {
        this.setState({ users: undefined });
        this._getSharedUsersOfGroup()
    }

    _getSharedUsersOfGroup() {
        getAclForCalendar(this.props.userReducer.user.accessToken, this.props.navigation.state.params.calendarId).then(data => {
            let users = [];

            for (let i = 0; i < data.items.length; i++) {
                if (data.items[i].id.split("@")[1] != "group.calendar.google.com") {
                    users.push(data.items[i]);
                }
            }
            this.setState({ users: users });
        });
    }

    _deleteCalendar() {
        removeUserCalendar(this.props.userReducer.user.accessToken, this.props.navigation.state.params.calendarId).then(data => {
            this.props.navigation.navigate("GroupsCalendar");
        });
    }

    _renderRow({ item }) {
        return (
            <ListItem
                hideChevron
                leftIcon={{
                    name: item.scope.type,
                    color: item.color,
                    type: "font-awesome"
                }}
                title={item.scope.value}
                subtitle={item.role}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.contentContainer}>
                    <List
                        containerStyle={{ marginTop: -1, }}
                    >
                        <FlatList
                            data={this.state.users}
                            keyExtractor={(item) => item.id}
                            renderItem={this._renderRow}
                        />
                    </List>
                </ScrollView>
                <View style={styles.actionContainer}>
                    <Text style={styles.textStyle}>Add people</Text>
                    <Icon
                        name='md-person-add'
                        type='ionicon'
                        size={25}
                        color='#F39C12'
                        onPress={() => this.props.navigation.navigate("ShareCalendarView", {
                            calendarId: this.props.navigation.state.params.calendarId,
                            calendarName: this.props.navigation.state.params.calendarName
                        })
                        }
                    />
                </View>
                <View style={styles.actionContainer}>
                    <Text style={styles.textStyle}>Delete people</Text>
                    <Icon
                        name='delete'
                        type='material-community'
                        size={25}
                        color='#F39C12'
                        onPress={() => alert('Delete people')}
                    />
                {/* </View> */}
                {/* <View style={styles.actionContainer}> */}
                    <Text style={styles.textStyle}>Delete calendar</Text>
                    <Icon
                        name='delete'
                        type='material-community'
                        size={25}
                        color='#F39C12'
                        onPress={() => this._deleteCalendar()}
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
    contentContainer: {
        flex: 1,
    },
    actionContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: "center",
        justifyContent: 'center',
    },
    textStyle: {
        marginHorizontal: 11,
    },
});

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(ManageCalendarView)