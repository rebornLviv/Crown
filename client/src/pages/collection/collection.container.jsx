import { connect } from "react-redux";
import { compose } from "redux";
import { selectIsColletionsLoaded } from "../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";
import CollectionPage from './collection.component';
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const mapPropsToState  = createStructuredSelector({
    isLoading:state => !selectIsColletionsLoaded(state)
})

const CollectionPageContainer = compose(
    connect(mapPropsToState),
    WithSpinner
    )(CollectionPage)

export default CollectionPageContainer;
