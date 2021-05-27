import React, { useState, useEffect } from "react";

export const Date = ({ date }) => {
  const [dateFormat, setDateFormat] = useState("");

  useEffect(() => {
    const info = date?.toDate().toLocaleDateString("en-US").split("/");
    const result = `${info[1].length === 2 ? info[1] : 0 + info[1]}/${
      info[0].length === 2 ? info[0] : 0 + info[0]
    }/${info[2]}`;

    setDateFormat(result);
  }, [date]);

  return (
    <div>
      <p className="display-date">{dateFormat}</p>
    </div>
  );
};
