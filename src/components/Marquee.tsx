import React, { useState, useEffect, TimeHTMLAttributes } from "react";

interface Marquee {
  text: string;
}

export function Marquee({ text }: Marquee) {
  const [currentText, setCurrentText] = useState(text);
  const [intervalId, setIntervalId] = useState<number>(undefined);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCurrentText((current) => {
  //       return current.substring(1) + current[0];
  //     });
  //   }, 3000);
  //   setIntervalId(id);

  //   return () => clearInterval(intervalId);
  // }, [intervalId]);

  return <div className="text-sm font-bold text-left">{currentText}</div>;
}
