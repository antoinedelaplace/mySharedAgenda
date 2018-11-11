import React from 'react'
import { View, Text, FlatList, StyleSheet, NavButton } from 'react-native'
import { connect } from 'react-redux'
import AgendaView from './AgendaView';

class CalendarView extends React.Component {
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
});

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(CalendarView)