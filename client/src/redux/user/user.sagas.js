import { takeLatest, put,all ,call } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {auth, googleProvider,createUserProfileDocument,getCurrentUser } from "../../firebase/firebase.utils";
import { signInFailure,signInSuccess, singOutFailure, singOutSuccess, singUpFailure, signUpSuccess } from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth,additionalData) {
    try{
        console.log(additionalData)
        const userRef = yield call(createUserProfileDocument,userAuth,additionalData)
        const userSnapshot = yield userRef.get()
        yield put(signInSuccess({id:userSnapshot.id,...userSnapshot.data()}))
    }catch(error){
        yield put(signInFailure(error))
    }
}
function* signInAfterSignUp({payload:{user,data}}){
 yield getSnapshotFromUserAuth(user,{displayName:data})
}

export function* onSignUpSuccess(){
yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,signInAfterSignUp)

}

export function* singInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)
    }catch(error){
        yield put(signInFailure(error))
    }
}
export function* onGoogleSingInStart (){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,singInWithGoogle)
    
    }
export function* signInWithEmail({payload:{email,password}}){
 try{
    const {user} = yield auth.signInWithEmailAndPassword(email,password)
    yield getSnapshotFromUserAuth(user)
 }
 catch(error){
    put(signInFailure(error))
 }
}    
export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail)
}

export function* checkUserSession(){
    try{
        console.log('here')
        const userAuth= yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)

    }
    catch(error) {
         yield put (signInFailure(error))
    }

}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,checkUserSession)
}
export function* signOut (){
    console.log('here')
    try{
        yield auth.signOut()
        yield put(singOutSuccess())
    }
    catch(error){
        yield put(singOutFailure(error))
    }
}

export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)

}

export function*  signup ({payload:{email,password,displayName}}) {
        try{
            console.log(displayName)
            const {user} = yield auth.createUserWithEmailAndPassword(email,password)
            yield put(signUpSuccess({user,data:displayName}))       
         }
        catch(error){
            yield put(singUpFailure(error))
        }
}

export function* onSingUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START,signup)
}


export function* userSagas(){

   yield  all([call(onGoogleSingInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSingUpStart),
    call(onSignUpSuccess)
])
}  