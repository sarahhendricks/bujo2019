import React, { FunctionComponent, useEffect } from "react";
import { Pinterest } from "./util";
import { fetchPinsAsync } from "./store/pins/actions";
import { connect } from "react-redux";

const dispatchProps = {
    fetchPinsRequest: fetchPinsAsync.request
};

type Props = typeof dispatchProps;

const Admin: FunctionComponent<Props> = props => {
    const dataTransferMonth = "may";
    useEffect(() => {
        Pinterest.login(() => {
            console.log("here I am!");
            props.fetchPinsRequest(dataTransferMonth);
        });
    }, []);

    return <h1>Transferring data for {dataTransferMonth}...</h1>;
};

export default connect(null, dispatchProps)(Admin);
