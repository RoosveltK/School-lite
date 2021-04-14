import React from "react";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span className="dropdown-icon"></span>
  </a>
));

export default CustomToggle;

// Pour icon menu deroulant
// &#x25bc;