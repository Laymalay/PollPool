import React from "react";

const Poll = ({ poll: { title, creator, description } }) => {
  return (
    <div>
      <div>
        {title} {creator} {description}
      </div>
    </div>
  );
};

export default Poll;
