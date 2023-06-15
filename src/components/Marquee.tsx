import React, { useState, useEffect, TimeHTMLAttributes } from 'react'

interface MarqueeProps {
  text: string
}

export function Marquee({ text }: MarqueeProps) {
  const [currentText, setCurrentText] = useState(text)
  const [intervalId, setIntervalId] = useState<number>(0)

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCurrentText((current) => {
  //       return current.substring(1) + current[0];
  //     });
  //   }, 3000);
  //   setIntervalId(id);

  //   return () => clearInterval(intervalId);
  // }, [intervalId]);

  return <div className="text-left text-sm font-bold">{currentText}</div>
}
