import * as firebase from 'firebase'

export class AuthService {
    signUp(email: string, password: string) {
       return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
    }

    signIn(email: string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    logOut() {
        firebase.auth().signOut();
    }

    getActiveUser() {
        return firebase.auth().currentUser;
    }
}