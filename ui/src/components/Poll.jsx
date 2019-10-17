import React from "react";

const Poll = ({ poll: { title, creator, description } }) => {
  return (
    <div>
        {title} {description}
    </div>
  );
};

export default Poll;
