"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

const ReferralPreview = ({ message }) => {
  return (
    <div className="py-4">
      <MDEditor value={message} preview="preview" height={300} />
    </div>
  );
};

export default ReferralPreview;
