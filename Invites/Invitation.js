// Invites/Invitation.js

import firebase from 'react-native-firebase'

// Calling this function will open Google for login.
export const sendInvitation = async () => {
  try {

    const title = 'Invitation - My Shared Agenda';
    const message = 'Monsieur le Lama vous invites à télécharger l\'application mySharedAgenda';

    // create invitation
    const invitation = new firebase.invites.Invitation(title, message);

    invitation.setDeepLink('https://mynetworklife.files.wordpress.com/2017/08/lama.jpg?w=880');

    // send the invitation
    const invitationIds = await firebase.invites().sendInvitation(invitation);

    // use the invitationIds as you see fit
  } catch (e) {
    console.error(e);
  }
}