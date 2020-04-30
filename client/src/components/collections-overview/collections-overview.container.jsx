import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {  selectCollectionFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import collectionsOverview from "./collections-overview.component";
import { compose } from "redux";


const mapStateToProps = createStructuredSelector({
isLoading:selectCollectionFetching
})

const collectionsOverviewContainer =compose(
connect(mapStateToProps),
WithSpinner
)(collectionsOverview)

export default collectionsOverviewContainer;
