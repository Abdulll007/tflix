"use client";
import React, { useState } from "react";

const Description = ({
  animeDescription,
  className,
}: {
  animeDescription: string;
  className?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <p className={className}>
      {show ? animeDescription : animeDescription?.substring(0, 255)}{" "}
      {animeDescription?.length > 255 && (
        <button className="font-normal" onClick={() => setShow(!show)}>{`${
          show ? ` - less` : `  + more`
        }`}</button>
      )}
    </p>
  );
};

export default Description;
