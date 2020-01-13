import React, { FunctionComponent, useEffect } from "react";
import { Pinterest } from "./util";
import { fetchPinsAsync } from "./store/pins/actions";
import { connect } from "react-redux";

const dispatchProps = {
    fetchPinsRequest: fetchPinsAsync.request
};

type Props = typeof dispatchProps;

const Admin: FunctionComponent<Props> = ({ fetchPinsRequest }) => {
    const dataTransferMonth = "december";
    useEffect(() => {
        Pinterest.login(() => {
            fetchPinsRequest(dataTransferMonth);
        });
    }, [fetchPinsRequest]);

    return <h1>Transferring data for {dataTransferMonth}...</h1>;
};

export default connect(null, dispatchProps)(Admin);
