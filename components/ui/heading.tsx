import React from "react";

const Heading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="">
      <h2 className="text-3xl font-bold tracking-tight mb-1.5">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
