// Navigation/Navigations.js

import React from 'react'
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import MyCalendar from '../Components/MyCalendar'
import GroupsCalendar from '../Components/GroupsCalendar/GroupsCalendar'
import CalendarView from '../Components/CalendarView'
import UserCalendar from '../Components/UserCalendar'
import FamilyCalendar from '../Components/FamilyCalendar'
import Settings from '../Components/Settings'
import AddGroup from '../Components/GroupsCalendar/AddGroup'
import ManageCalendarView from '../Components/ManageCalendar/ManageCalendarView'
import ShareCalendarView from '../Components/ManageCalendar/ShareCalendarView'
import GroupCalendarView from '../Components/GroupsCalendar/GroupCalendarView'

/**
 * Permet de naviguer entre les vues de l'onglet Groupes
 */
const GroupsStackNavigator = createStackNavigator(
    {
        GroupsCalendar: {
            screen: GroupsCalendar,
            navigationOptions: {
                title: 'Groupes',
            }
        },
        GroupCalendarView: {
            screen: GroupCalendarView,
            navigationOptions: ({ navigation }) => ({
                title: navigation.getParam('calendarName'),
            }),
        },
        AddGroup: {
            screen: AddGroup,
            navigationOptions: {
                title: 'Nouveau groupe',
            }
        },
        ManageCalendarView: {
            screen: ManageCalendarView,
            navigationOptions: ({ navigation }) => ({
                title: navigation.getParam('calendarName'),
            }),
        },
        ShareCalendarView: {
            screen: ShareCalendarView,
            navigationOptions: ({ navigation }) => ({
                title: navigation.getParam('calendarName'),
            }),
        }
    },
    {
        initialRouteName: 'GroupsCalendar',
        // Les options communes de ce stackNavigator
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#F39C12"
            },
            headerTintColor: '#fff'
        }
    }
);

/**
 * Permet de naviguer entre les vues de l'onglet Users
 */
const UsersStackNavigator = createStackNavigator(
    {
        UserCalendar: {
            screen: UserCalendar,
            navigationOptions: {
                title: 'Contacts',
            }
        },
        CalendarView: {
            screen: CalendarView,
            navigationOptions: ({ navigation }) => ({
                title: navigation.getParam('calendarName'),
            }),
        }
    },
    {
        initialRouteName: 'UserCalendar',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#F39C12"
            },
            headerTintColor: '#fff'
        }
    }
);


/**
 * Permet de naviguer entre les vues de l'onglet Settings
 */
const SettingsStackNavigator = createStackNavigator(
    {
        Settings: {
            screen: Settings,
            navigationOptions: {
                title: 'Paramétres',
            }
        },
        ManageCalendarView: {
            screen: ManageCalendarView,
            navigationOptions: ({ navigation }) => ({
                title: navigation.getParam('calendarName'),
            }),
        }       
    },
    {
        initialRouteName: 'Settings',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#F39C12"
            },
            headerTintColor: '#fff'
        }
    }
);

/**
 * Permet de naviguer entre les vues de l'onglet Famille
 */
const FamilyStackNavigator = createStackNavigator(
    {
        FamilyCalendar: {
            screen: FamilyCalendar,
            navigationOptions: {
                title: 'Famille',
            }
        },
        ManageCalendarView: {
            screen: ManageCalendarView,
            navigationOptions: ({ navigation }) => ({
                title: 'Famille',
            }),
        },
        ShareCalendarView: {
            screen: ShareCalendarView,
            navigationOptions: ({ navigation }) => ({
                title: 'Famille',
            }),
        }
    },
    {
        initialRouteName: 'FamilyCalendar',
        navigationOptions: {
            headerStyle: {
                backgroundColor : "#F39C12"
            },
            headerTintColor: '#fff'
        }
    }
);

/**
 * Permet de naviguer entre les vues de l'onglet Famille
 */
const MyCalendarStackNavigator = createStackNavigator(
    {
        MyCalendar: {
            screen: MyCalendar,
            navigationOptions: {
                title: 'Mon agenda',
            }
        },
        ManageCalendarView: {
            screen: ManageCalendarView,
            navigationOptions: ({ navigation }) => ({
                title: 'Mon agenda',
            }),
        },
        ShareCalendarView: {
            screen: ShareCalendarView,
            navigationOptions: ({ navigation }) => ({
                title: 'Mon agenda',
            }),
        }
    },
    {
        initialRouteName: 'MyCalendar',
        navigationOptions: {
            headerStyle: {
                backgroundColor : "#F39C12"
            },
            headerTintColor: '#fff'
        }
    }
);

/*
 * Création de la TabBar en bas de l'écran
 */
const MainTabNavigator = createBottomTabNavigator(
    {
        MyCalendar: {
            screen: MyCalendarStackNavigator,
            navigationOptions: {
                title: "Accueil",
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_calendar.png')}
                        style={styles.icon} />
                }
            }
        },
        FamilyCalendar: {
            screen: FamilyStackNavigator,
            navigationOptions: {
                title: "Famille",
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_family.png')}
                        style={styles.icon} />
                }
            }
        },
        GroupsCalendar: {
            screen: GroupsStackNavigator,
            navigationOptions: {
                title: "Groupes",
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_groups.png')}
                        style={styles.icon} />
                }
            }
        },
        UserCalendar: {
            screen: UsersStackNavigator,
            navigationOptions: {
                title: "Contacts",
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_user.png')}
                        style={styles.icon} />
                }
            }
        },
        Settings: {
            screen: SettingsStackNavigator,
            navigationOptions: {
                title: "Paramétres",
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_settings.png')}
                        style={styles.icon} />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showIcon: true
        }
    }
);

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default MainTabNavigator