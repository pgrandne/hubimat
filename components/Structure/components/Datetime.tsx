"use client";

import { useEffect, useState } from "react";

export const Datetime = () => {
  const [datetime, setDatetime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDatetime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const hours = datetime.getHours().toString().padStart(2, "0");
  const minutes = datetime.getMinutes().toString().padStart(2, "0");
  const seconds = datetime.getSeconds().toString().padStart(2, "0");
  const day = datetime.getDate().toString().padStart(2, "0");
  const month = (datetime.getMonth() + 1).toString().padStart(2, "0");
  const year = datetime.getFullYear();

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className="text-center">
      <p className="text-sm">{formattedTime}</p>
      <p className="text-sm">{formattedDate}</p>
    </div>
  );
};
