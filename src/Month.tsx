import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { PinState } from "./store/pins/reducers";
import { selectPinsByMonth } from "./store/pins/selectors";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import { Pin } from "./types";
import { CSSTransition } from "react-transition-group";
import LazyLoad from "react-lazyload";

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
                  Math.random() * (1000 - originalHeight * ratio)
              )}px`,
              left: `${Math.floor(Math.random() * (1000 - 300))}px`,
              position: "absolute" as "absolute"
          }
        : {
              height: "300px",
              width: "auto",
              top: `${Math.floor(Math.random() * (1000 - 300))}px`,
              left: `${Math.floor(
                  Math.random() * (1000 - originalWidth * ratio)
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
                width: "1000px",
                margin: "0 auto",
                backgroundColor: "#aabbcc"
            }}
        >
            <h1>{month}</h1>
            <LazyLoad key={month} placeholder={<Loading />}>
                <div
                    style={{
                        position: "relative",
                        height: "1000px",
                        width: "100%",
                        padding: "0 150px 0 0",
                        backgroundColor: "#aaaaaa"
                    }}
                >
                    <img
                        style={resizeImage(300, 340)}
                        src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12234558/Chinook-On-White-03.jpg"
                    />
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
            </LazyLoad>
        </div>
    );
};

export default connect(mapStateToProps)(Month);
