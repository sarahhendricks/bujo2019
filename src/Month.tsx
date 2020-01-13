import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { PinState } from "./store/pins/reducers";
import { selectPinsByMonth } from "./store/pins/selectors";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import { Pin } from "./types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LazyLoad from "react-lazyload";

const containerWidth = 1000;
const containerHeight = 1000;

type OwnProps = {
    month: string;
};

const mapStateToProps = (state: PinState, ownProps: OwnProps) => ({
    pins: selectPinsByMonth(state, { month: ownProps.month })
});

type Props = ReturnType<typeof mapStateToProps> & OwnProps;

const resizeImage = (originalHeight: number, originalWidth: number) => {
    const isHorizontal = originalHeight <= originalWidth;
    var ratio = Math.min(300 / originalWidth, 300 / originalHeight);
    return isHorizontal
        ? {
              height: "auto",
              width: "300px",
              top: `${Math.floor(
                  Math.random() * (containerHeight - originalHeight * ratio)
              )}px`,
              left: `${Math.floor(Math.random() * (containerWidth - 300))}px`,
              position: "absolute" as "absolute"
          }
        : {
              height: "300px",
              width: "auto",
              top: `${Math.floor(Math.random() * (containerHeight - 300))}px`,
              left: `${Math.floor(
                  Math.random() * (containerWidth - originalWidth * ratio)
              )}px`,
              position: "absolute" as "absolute"
          };
};

const Loading: FunctionComponent = () => (
    <Segment inverted>
        <Dimmer active inverted>
            <Loader />
        </Dimmer>
    </Segment>
);

const Month: FunctionComponent<Props> = ({ month, pins }) => {
    return (
        <div
            id={month}
            key={month}
            style={{
                height: "1400px",
                width: `${containerWidth}px`,
                margin: "0 auto"
            }}
        >
            <h1>{month}</h1>
            <LazyLoad key={month} placeholder={<Loading />}>
                <div
                    style={{
                        position: "relative",
                        height: `${containerHeight}px`,
                        width: "100%",
                        padding: "0 150px 0 0"
                    }}
                >
                    <TransitionGroup>
                        {pins &&
                            pins.map((pin: Pin) => (
                                <CSSTransition
                                    in={true}
                                    timeout={5000}
                                    classNames={"fade"}
                                    key={pin.id}
                                >
                                    <a href={pin.link}>
                                        <img
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
                    </TransitionGroup>
                </div>
            </LazyLoad>
        </div>
    );
};

export default connect(mapStateToProps)(Month);
