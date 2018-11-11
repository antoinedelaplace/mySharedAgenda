import React from 'react'
import {View, StyleSheet, Modal, ScrollView} from 'react-native'
import {Text, Button, Icon, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import {getUserCalendarList, getUserCalendar, addUserEvent} from '../../Google/calendar/googleCalendar'
import {connect} from 'react-redux'
import DatePicker from 'react-native-datepicker'
import moment from "moment";

class AddEvent extends React.Component {

    constructor(props) {
        super(props);

        // Bind function to render
        this._toggleModal = this._toggleModal.bind(this);
        this._addUserEvent = this._addUserEvent.bind(this);
        this.sendData = this.sendData.bind(this);

        // States
        this.state = {
            eventModalVisible: false,
            addEventDisabled: false,
            items: {},
            eventName: '',
            eventDesc: '',
            dateStart: null,
            dateStartValue: null,
            dateEnd: null,
            dateEndValue: null
        };
    }

    _toggleModal() {
        this.setState({
            addEventDisabled: !this.state.eventModalVisible
        });

        // BUG timeout long press
        setTimeout(() => {
            this.setState({
                eventModalVisible: !this.state.eventModalVisible
            });
        }, 80)
    }

    sendData() {
        this._addUserEvent()
    }

    _addUserEvent() {
        const toggleModal = this._toggleModal();
        if (this.props.calendarReducer.calendars !== undefined && this.props.calendarReducer.calendars.length > 0) {
            let dataSample = {
                start: {
                    dateTime: this.state.dateStart.toISOString(),
                    timeZone: 'Europe/Paris'
                },
                end: {
                    dateTime: this.state.dateEnd.toISOString(),
                    timeZone: 'Europe/Paris'
                },
                summary: this.state.eventName,
                description: this.state.eventDesc,
                location: '',
                visibility: 'private'
            };

            // Adding using Google Facade API
            console.log(dataSample);
            console.log(this.props.calendarId);
            addUserEvent(this.props.userReducer.user.accessToken, this.props.calendarId, dataSample).then(result => {
                this.setState({
                    addEventDisabled: false
                });
                if (result.status === "confirmed") {
                    console.log(result);
                    toggleModal();
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.eventModalVisible}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={styles.modalWrapper}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Icon
                                    raised
                                    name='close'
                                    color='#FFF'
                                    underlayColor='#000'
                                    containerStyle={styles.closeModal}
                                    onPress={this._toggleModal} />
                            </View>
                            <View style={styles.modalBody}>
                                <Text h3 style={styles.modalTitle}>Ajouter un évènement</Text>
                                <View style={styles.modalInnerView}>
                                    <ScrollView style={styles.modalInner}>
                                        <View style={styles.formField}>
                                            <FormLabel>Nom de l'évènement</FormLabel>
                                            <FormInput
                                                ref={input => this.eventName = input}
                                                onChangeText={(text) => this.setState({eventName: text})}
                                                containerStyle={styles.inputWrapperStyle}
                                                inputStyle={styles.inputStyle}/>
                                        </View>
                                        <View style={styles.formField}>
                                            <FormLabel>Description</FormLabel>
                                            <FormInput
                                                ref={input => this.eventDesc = input}
                                                onChangeText={(text) => this.setState({eventDesc: text})}
                                                containerStyle={styles.inputWrapperStyle}
                                                inputStyle={styles.inputStyle}/>
                                        </View>
                                        <View style={styles.formField}>
                                            <FormLabel>Date de début</FormLabel>
                                            <Text style={styles.dateContainer}>{JSON.stringify(this.state.dateStartValue)}</Text>
                                            <DatePicker
                                                is24Hour={true}
                                                style={{width: 'auto'}}
                                                date={this.state.dateStartValue}
                                                hideText={true}
                                                mode="datetime"
                                                placeholder="Choisir une date de début"
                                                confirmBtnText="OK"
                                                cancelBtnText="Retour"
                                                customStyles={{
                                                    dateIcon: {
                                                        position: 'absolute',
                                                        left: 20,
                                                        top: 4,
                                                        marginLeft: 0
                                                    },
                                                    dateInput: styles.datepickerStyle
                                                }}
                                                onDateChange={(date) => {
                                                    this.setState({dateStartValue: date});
                                                    this.setState({dateStart: moment(date)});
                                                }}
                                            />
                                        </View>
                                        <View style={styles.formField}>
                                            <FormLabel>Date de fin</FormLabel>
                                            <Text style={styles.dateContainer}>{JSON.stringify(this.state.dateEndValue)}</Text>
                                            <DatePicker
                                                is24Hour={true}
                                                style={{width: 'auto'}}
                                                date={this.state.dateEndValue}
                                                hideText={true}
                                                mode="datetime"
                                                placeholder="Choisir une date de début"
                                                confirmBtnText="OK"
                                                cancelBtnText="Retour"
                                                customStyles={{
                                                    dateIcon: {
                                                        position: 'absolute',
                                                        left: 20,
                                                        top: 4,
                                                        marginLeft: 0
                                                    },
                                                    dateInput: styles.datepickerStyle

                                                }}
                                                onDateChange={(date) => {
                                                    this.setState({dateEndValue: date});
                                                    this.setState({dateEnd: moment(date)})
                                                }}
                                            />
                                        </View>
                                        <View style={styles.formFieldEnd}>
                                            <Button
                                                raised
                                                icon={{name: 'check'}}
                                                title={'Valider'}
                                                buttonStyle={styles.btnValider}
                                                onPress={this.sendData}
                                            />
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Button
                    raised
                    disabled={this.state.addEventDisabled}
                    buttonStyle={styles.addBtnStyle}
                    icon={{name: 'plus-one'}}
                    onPress={this._toggleModal}
                    title="Ajouter un evenement" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addBtnStyle: {
        backgroundColor: '#2196F4'
    },
    closeModal: {
        backgroundColor: '#f42137',
        zIndex: 99999999
    },
    container: {
        backgroundColor: 'transparent'
    },
    modalHeader: {
        width: '100%',
        alignItems: 'flex-end',
        backgroundColor: '#2196F4',
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 20,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        zIndex: 10
    },
    modalWrapper: {
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        backgroundColor: '#66666666'
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 10
    },
    modalTitle: {
        marginTop: -100,
        width: '80%',
        fontSize: 32,
        minHeight: 80,
        color: '#FFF',
        zIndex: 11
    },
    modalBody: {
        padding: 15
    },
    modalInnerView: {
        flexGrow: 1,
        paddingTop: 20,
        height: '90%'
    },
    modalInner: {
    },
    label: {
        fontWeight: '500',
        fontSize: 18
    },
    inputStyle: {
        maxWidth: '100%'
    },
    datepickerStyle: {
        borderWidth: 0,
        width: 0
    },
    inputWrapperStyle: {
        backgroundColor: '#F1F1F1',
        padding: 5,
        borderRadius: 6
    },
    btnValider: {
        backgroundColor: '#22a337',
    },
    formField: {
        marginBottom: 5
    },
    formFieldEnd: {
        marginTop: 10
    },
    dateContainer: {
        marginLeft: 20,
        marginRight: 20
    }
});

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(AddEvent)