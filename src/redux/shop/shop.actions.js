import ShopActionTypes from './shop.types';


import { firestore ,convertCollectionSnapshotToMap} from '../../firebase/firebase.util'

export const fetchCollectionsStart =(collectionsMap)=>({
    type:ShopActionTypes.FETCH_COLLECTIONS_START,
});


export const fetchCollectionsSuccess = collectionMap =>({
   type:ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
   payload: collectionMap
});

export const fetchCollectionsFailure = errorMessage =>({
    type:ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () =>{
    return dispatch =>{
        const collectionRef = firestore.collection('collections'); 
        dispatch(fetchCollectionsStart());

        collectionRef.get().then( (async snapshot =>{
            const collectionMap = convertCollectionSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionMap));
          })).catch (error=> dispatch(fetchCollectionsFailure(error.message)));
    }
}
