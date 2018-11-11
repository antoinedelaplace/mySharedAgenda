import React from 'react'
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import { Agenda } from 'react-native-calendars';
import { connect } from 'react-redux'
import { listUserEvents } from '../Google/calendar/googleCalendar'
import moment from 'moment';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
};

LocaleConfig.defaultLocale = 'fr';

class AgendaView extends React.Component {

    constructor(props) {
        super(props);

        // States
        this.state = {
            items: {}
        };
    }

    render() {
        return (
            /*<Agenda>
                items={
                    {
                        '2018-10-20': [{ text: 'item 1 - any js object' }],
                        '2018-10-21': [{ text: 'item 2 - any js object' }],
                        '2018-10-22': [],
                        '2018-10-23': [{ text: 'item 3 - any js object' }, { text: 'any js object' }],
                    }}
                loadItemsForMonth={(month) => { console.log('trigger items loading') }}
                onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
                onDayPress={(day) => { console.log('day pressed') }}
                onDayChange={(day) => { console.log('day changed') }}
                selected={'2018-10-20'}
                minDate={'2018-01-01'}
                maxDate={'2018-12-31'}
                pastScrollRange={10}
                futureScrollRange={10}
                renderItem={(item, firstItemInDay) => { return (<View />); }}
                renderDay={(day, item) => { return (<View />); }}
                renderEmptyDate={() => { return (<View />); }}
                renderKnob={() => { return (<View />); }}
                renderEmptyData = {() => { return (<View />); }}
                rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
                hideKnob={false}
                markedDates={{
                    '2018-10-20': { selected: true, marked: true },
                    '2018-10-21': { marked: true },
                    '2018-10-22': { disabled: true }
                }}
                onRefresh={() => console.log('refreshing...')}
                refreshing={false}
                refreshControl={null}

                style={{}}
            </Agenda>*/
            /*<ScrollView ref={'scrollview'}>
                <FlatList
                    data={this.props.events}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <Text >{item.summary}</Text>
                            <Text >{item.status}</Text>
                            {item.creator && item.creator.displayName && <Text>{item.creator.displayName}</Text>}
                            {item.start && item.start.dateTime && <Text>{item.start.dateTime}</Text>}
                        </View>
                    )}
                />
            </ScrollView>*/
            <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={() => {return (<View />);}}
                renderEmptyData = {() => { return (<View />); }}
                rowHasChanged={this.rowHasChanged.bind(this)}
                // onDaychange={this.onDayChange.bind(this)}
                // markingType={'period'}
                // monthFormat={'yyyy'}
                // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            />
        )
    }

    loadItems(day) {
        if (typeof this.props.onUpdateDate === 'function') this.props.onUpdateDate(day);
        console.log('LoadItems', this.props.calendarId);
        if (this.props.calendarId) {
            let items = {};
            let newItems = this.state.items;
            let strTime;
            let StartdateTime, EnddateTime;
            if (day) {
                StartdateTime = moment(day).startOf('month').format("YYYY-MM-DDTHH:mm:ssZ");
                EnddateTime = moment(day).endOf('month').format("YYYY-MM-DDTHH:mm:ssZ");
            }
            else {
                StartdateTime = moment().startOf('month').format("YYYY-MM-DDTHH:mm:ssZ");
                EnddateTime = moment().endOf('month').format("YYYY-MM-DDTHH:mm:ssZ");
            }
            console.log(day);
            console.log(StartdateTime + "-" + EnddateTime);
            listUserEvents(this.props.userReducer.user.accessToken, this.props.calendarId, StartdateTime, EnddateTime).then(data => {
                if (data.items) {
                    for (let i = 0; i < data.items.length; i++) {
                        if (data.items[i].start != undefined && data.items[i].start.dateTime != undefined) {
                            strTime = data.items[i].start.dateTime.split('T')[0];
                            if (!newItems[strTime]) {
                                newItems[strTime] = [];
                                if (!items[strTime])
                                    items[strTime] = [];
                                items[strTime].push({summary: data.items[i].summary})
                            }
                        }
                    }
                    Object.keys(items).forEach(key => {
                        newItems[key] = items[key];
                    });
                    this.setState({items: newItems});
                }
            });
        }
        /*setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 5);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            console.log(this.state.items);
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
            this.setState({
                items: newItems
            });
            console.log(this.state.items);
        }, 1000);*/
        // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem(item) {
        return (
            <View style={[styles.item]}><Text>{item.summary}</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    }
});

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(AgendaView)