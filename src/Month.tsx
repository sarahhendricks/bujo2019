import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { PinState } from "./store/pins/reducers";
import { selectIsLoadingPins, selectPinsByMonth } from "./store/pins/selectors";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import { Pin } from "./types";
import uuid from "uuid";
import { CSSTransition } from "react-transition-group";

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
    const top = Math.floor(Math.random() * 95);
    const left = Math.floor(Math.random() * 95);
    return isHorizontal
        ? {
              height: "auto",
              width: "300px",
              top: `${top}%`,
              left: `${left}%`,
              position: "absolute" as "absolute"
          }
        : {
              height: "300px",
              width: "auto",
              top: `${top}%`,
              left: `${left}%`,
              position: "absolute" as "absolute"
          };
};

const Month: FunctionComponent<Props> = ({ month, isLoadingPins, pins }) => {
    return (
        <div
            id={month}
            key={month}
            style={{ height: "1400px", width: "1000px" }}
        >
            <h1>{month}</h1>
            {isLoadingPins && !pins && (
                <Segment inverted>
                    <Dimmer active inverted>
                        <Loader />
                    </Dimmer>
                </Segment>
            )}
            <div
                style={{
                    position: "absolute",
                    height: "1000px",
                    width: "100%",
                    padding: "0 150px 0 0"
                }}
            >
                {pins &&
                    pins.map((pin: Pin) => (
                        <CSSTransition
                            in={true}
                            timeout={5000}
                            classNames={"fade"}
                            key={uuid()}
                        >
                            <a href={pin.link}>
                                <img
                                    // className="fadeIn"
                                    style={resizeImage(
                                        pin.image.original.height,
                                        pin.image.original.width
                                    )}
                                    src={pin.image.original.url}
                                    alt={pin.note}
                                />
                            </a>
                        </CSSTransition>
                    ))}
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(Month);
