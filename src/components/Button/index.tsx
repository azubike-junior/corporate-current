import React from "react";

type ButtonProp = {
  className: string;
  onClick?: () => void;
  child: string;
  type: "button" | "submit";
};

export default function Button({
  onClick,
  type,
  className,
  child,
}: ButtonProp) {
  return (
    <div className="user_acct_details col-lg-6 col-md-6 col-sm-12 m-b-10">
      <button onClick={onClick} className={className} type={type}>
        {child}
      </button>
    </div>
  );
}
