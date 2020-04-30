import ShopActionTypes from "./shop.types";
import { firestore,convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = ()=>({

type:ShopActionTypes.FETCH_COLLECTION_START
})
export const fetchCollectionsSuccess = colletionsMap =>({
type:ShopActionTypes.FETCH_COLLECTION_SUCCESS,
payload:colletionsMap
})
export const fetchCollectionsStartAsync = () =>{
    return dispatch => {
       
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart())
        collectionRef.get().then(
           async snapshot => {
            console.log(snapshot)
          const collectionsMap =   convertCollectionSnapshotToMap(snapshot)
          dispatch(fetchCollectionsSuccess(collectionsMap))
          } 
        )

        
    }

}
export const fetchCollectionsFailure = errorMessage =>({
    type:ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload:errorMessage

})