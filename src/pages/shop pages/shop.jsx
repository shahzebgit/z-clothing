import React from "react";
import { Route } from "react-router-dom";
import {connect} from 'react-redux';

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionsPage from "../collection/collection.component";
import {updateCollections} from '../../redux/shop/shop.actions';
import { firestore ,convertCollectionSnapshotToMap} from '../../firebase/firebase.util'
import withSpinner from '../../components/with-spinner/with-spinner.component'


const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview)
const CollectionsPageWithSpinner = withSpinner(CollectionsPage); 
class ShopPage extends React.Component {
  
  state ={
    loading:true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount(){
    const collectionRef = firestore.collection('collections');
    const {updateCollections} =this.props
    collectionRef.onSnapshot(async snapshot =>{
      const collectionMap = convertCollectionSnapshotToMap(snapshot);
      updateCollections(collectionMap);
      this.setState({loading:false})
    })
  }

  render() {
    const { match } = this.props;
    const { loading} = this.state;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props)=><CollectionsOverviewWithSpinner isLoading={loading}{...props}/>}/>
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => <CollectionsPageWithSpinner isLoading={loading} {...props} />}
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
