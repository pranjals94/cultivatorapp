import React, { Component } from "react";

const Avatar = ({ src, classnamesrc, alt }) => {
  return (
    <div>
      <img classname={classnamesrc} src={src} alt={alt} />
    </div>
  );
};

export default Avatar;
