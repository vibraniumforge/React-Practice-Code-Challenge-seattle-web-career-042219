import React, { Fragment } from "react";
import MoreButton from "../components/MoreButton";
import Sushi from "../components/Sushi";

const SushiContainer = props => {
  const sushis = props.sushis.map((sushi, index) => {
    return (
      <Sushi
        onHandleSushiPlateClick={props.onHandleSushiPlateClick}
        sushi={sushi}
        key={index}
      />
    );
  });
  return (
    <Fragment>
      <div className="belt">{sushis}</div>
      <MoreButton onHandleMoreButtonClick={props.onHandleMoreButtonClick} />
    </Fragment>
  );
};

export default SushiContainer;
