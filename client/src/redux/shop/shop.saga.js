import {takeLatest,call,put,all} from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import { fetchCollectionsSuccess , fetchCollectionsFailure} from './shop.actions'
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
export function* fetchCollectionsAsync(){
   yield console.log('I am fired')
   try{
   const collectionRef = firestore.collection('collections');
const snapshot = yield collectionRef.get();
const collectionsMap = yield call (convertCollectionSnapshotToMap,snapshot)
//put in saga is dispatch
yield put(fetchCollectionsSuccess(collectionsMap))
   }
   catch(error){
    yield put(fetchCollectionsFailure(error))
   }
//    collectionRef.get().then(
//       async snapshot => {
//        console.log(snapshot)
//      const collectionsMap =   convertCollectionSnapshotToMap(snapshot)
//      dispatch(fetchCollectionsSuccess(collectionsMap))
//       }
//    )
 
}

export function* fetchCollectionsStart(){

    yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START
        ,fetchCollectionsAsync)
}
export function* shopSagas (){
    yield all([call(fetchCollectionsStart)])

}