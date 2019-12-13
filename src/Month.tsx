import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { PinState } from "./store/pins/reducers";
import { selectIsLoadingPins, selectPinsByMonth } from "./store/pins/selectors";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import { Pin } from "./types";
import uuid from "uuid";

type OwnProps = {
    month: string;
};

const mapStateToProps = (state: PinState, ownProps: OwnProps) => ({
    isLoadingPins: selectIsLoadingPins(state),
    pins: selectPinsByMonth(state, { month: ownProps.month })
});

type Props = ReturnType<typeof mapStateToProps> & OwnProps;

const resizeImage = (originalHeight: number, originalWidth: number) => {
    const isHorizontal = originalHeight <= originalWidth;
    return isHorizontal
        ? {
              height: "auto",
              width: "300px"
          }
        : { height: "300px", width: "auto" };
};

const Month: FunctionComponent<Props> = ({ month, isLoadingPins, pins }) => {
    return (
        <div id={month} key={month}>
            <h1>{month}</h1>
            {isLoadingPins && !pins && (
                <Segment inverted>
                    <Dimmer active inverted>
                        <Loader />
                    </Dimmer>
                </Segment>
            )}
            <div
            // style={{ position: "absolute" }}
            >
                {pins &&
                    pins.map((pin: Pin) => (
                        <a href={pin.link} key={uuid()}>
                            <img
                                className="fadeIn"
                                style={resizeImage(
                                    pin.image.original.height,
                                    pin.image.original.width
                                )}
                                src={pin.image.original.url}
                                alt={pin.note}
                            />
                        </a>
                    ))}
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(Month);
