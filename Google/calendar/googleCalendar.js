
const URL_API= 'https://www.googleapis.com/calendar/v3';

/**
 * getUserCalendarList
 * @param token Google
 * @returns {Promise<T | void>} La liste des calendriers de l'utilisateur
 */
export function getUserCalendarList (token) {
    const url = URL_API + '/users/me/calendarList';
    return fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}


/**
 * getUserCalendar
 * @param token Google
 * @param calendarId
 * @returns {Promise.<U>|Promise.<T>} Les infos d'un calendrier
 */
export function getUserCalendar (token, calendarId) {
    const url = URL_API + '/calendars/' + calendarId;
    return fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}


/**
 * getUserEvent
 * @param token Google
 * @param calendarId
 * @param eventId
 * @returns {Promise.<U>|Promise.<T>} détail d'un événement
 */
export function getUserEvent (token, calendarId, eventId) {
    const url = URL_API + '/calendars/' + calendarId + '/events/' + eventId;
    return fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

/**
 * listUserEvents
 * @param token
 * @param calendarId
 * @param timeMin
 * @param timeMax
 * @returns {Promise.<T>|Promise.<U>} liste des events
 */
export function listUserEvents (token, calendarId, timeMin, timeMax) {
    const url = URL_API + '/calendars/' + calendarId + '/events?timeMin='+ encodeURIComponent(timeMin) + '&timeMax=' + encodeURIComponent(timeMax);
    return fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}


/**
 * addUserCalendar
 * @param token Google
 * @param name of the calendar
 * @param description of the calendar
 * @returns {Promise.<U>|Promise.<T>}
 */
export function addUserCalendar (token, name, description="") {
    const url = URL_API + '/calendars';
    return fetch(url, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            summary: name,
            description: description
        })
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

/**
 * addUserEvent
 * @param token
 * @param calendarId
 * @param data 's event
 * @returns {Promise.<U>|Promise.<T>}
 */
export function addUserEvent (token, calendarId, data) {
    const url = URL_API + '/calendars/'+calendarId+'/events';
    return fetch(url, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            summary: data.summary,
            start : data.start,
            end : data.end,
            description : data.description,
            location : data.location,
            visibility : data.visibility
        })
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

/**
 * removeUserCalendar
 * @param token Google
 * @param calendarId
 * @returns {Promise.<U>|Promise.<T>}
 */
export function removeUserCalendar (token, calendarId) {
    const url = URL_API + '/calendars/' + calendarId;
    return fetch(url, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then((response) => response)
        .catch((error) => console.error(error))
}

/**
 * removeUserEvent
 * @param token
 * @param calendarId
 * @param eventId
 * @returns {Promise.<U>|Promise.<T>}
 */
export function removeUserEvent (token, calendarId, eventId) {
    const url = URL_API + '/calendars/' + calendarId + '/events/' + eventId;
    return fetch(url, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

/**
 * moveUserEvent
 * @param token
 * @param calendarId current calendar
 * @param eventId
 * @param newCalendarId
 * @returns {Promise.<U>|Promise.<T>}
 */
export function moveUserEvent (token, calendarId, eventId, newCalendarId) {
    const url = URL_API + '/calendars/' + calendarId + '/events/' + eventId + '/move';
    return fetch(url, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        arguments : {
            destination : newCalendarId
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

/**
 * updateUserEvent
 * @param token
 * @param calendarId
 * @param eventId
 * @param data
 * @returns {Promise.<U>|Promise.<T>}
 */
export function updateUserEvent (token, calendarId, eventId, data) {
    const url = URL_API + '/calendars/' + calendarId + '/events/' + eventId;
    return fetch(url, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            start : data.start,
            end : data.end,
            description : data.description,
            location : data.location,
            visibility : data.visibility,

        })
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}


/**
 * shareCalendar
 * @param token
 * @param calendarId
 * @param scope - type & value
 * @param role - freeBusyReader, reader, writer, owner
 * @returns {Promise.<T>|Promise.<U>}
 */
export function shareCalendar (token, calendarId, scope, role) {
    const url = URL_API + '/calendars/' + calendarId + '/acl';
    return fetch(url, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            role : role,
            scope : scope,

        })
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

/**
 * getAclForCalendar
 * @param token
 * @param calendarId
 * @returns {Promise.<T>|Promise.<U>}
 */
export function getAclForCalendar (token, calendarId) {
    const url = URL_API + '/calendars/' + calendarId + '/acl';
    return fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}



