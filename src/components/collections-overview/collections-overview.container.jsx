import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {compose } from 'redux';

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import CollectionsOverview from "./collections-overview.component";
import withSpinner from "../with-spinner/with-spinner.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionsOverview);


export default CollectionsOverviewContainer;