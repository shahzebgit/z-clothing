import React from "react";
import { Route } from "react-router-dom";
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionsPage from "../collection/collection.component";
import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors'
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';

import withSpinner from '../../components/with-spinner/with-spinner.component'


const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview)
const CollectionsPageWithSpinner = withSpinner(CollectionsPage); 
class ShopPage extends React.Component {
  
  state ={
    loading:true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount(){
    const {fetchCollectionsStartAsync} =this.props;
    fetchCollectionsStartAsync()
   
  }

  render() {
    const { match, isCollectionsFetching } = this.props;

    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props)=><CollectionsOverviewWithSpinner isLoading={isCollectionsFetching}{...props}/>}/>
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => <CollectionsPageWithSpinner isLoading={isCollectionsFetching} {...props} />}
        />
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isCollectionsFetching:selectIsCollectionFetching
})

const mapDispatchToProps = dispatch =>({
  fetchCollectionsStartAsync:() => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);
