import React from "react";
import "./PollHeader.css";

const PollHeader = ({ headerImage, title, username, description }) => {
  return (
    <div className="poll-header" style={headerImage}>
      <div className="shadow">
        <div className="poll-title">{title}</div>
        <div className="poll-creator">By {username}</div>
      </div>
      <div className="poll-desc"> {description}</div>
    </div>
  );
};
export default PollHeader;
