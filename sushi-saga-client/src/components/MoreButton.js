import React from "react";

const MoreButton = props => {
  return (
    <button className="button" onClick={props.onHandleMoreButtonClick}>
      More sushi!
    </button>
  );
};

export default MoreButton;
