import React from "react";
import { Route } from "react-router-dom";
import {connect} from 'react-redux';

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionsPage from "../collection/collection.component";
import {updateCollections} from '../../redux/shop/shop.actions';
import { firestore ,convertCollectionSnapshotToMap} from '../../firebase/firebase.util'


class ShopPage extends React.Component {

  unsubscribeFromSnapshot = null;

  componentDidMount(){
    const collectionRef = firestore.collection('collections');
    const {updateCollections} =this.props
    collectionRef.onSnapshot(async snapshot =>{
      const collectionMap = convertCollectionSnapshotToMap(snapshot);
      updateCollections(collectionMap);
      
    })
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionsPage}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>({
  updateCollections:collectionsMap =>
  dispatch(updateCollections(collectionsMap))
})

export default connect(null,mapDispatchToProps)(ShopPage);
