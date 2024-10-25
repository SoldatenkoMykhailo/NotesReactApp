import React from "react";
import PropTypes from "prop-types";
export default function Footer(props) {
  return (
    <>
      <p
        style={{
          fontFamily: 'Georgia, "Times New Roman", Times, serif',
        }}
      >
        Or
      </p>
      <a
        href={props.a_href}
        style={{
          fontFamily: 'Georgia, "Times New Roman", Times, serif',
          color: "black",
        }}
      >
        {props.a_text}
      </a>
    </>
  );
}

Footer.propTypes = {
  a_href: PropTypes.string.isRequired,
  a_text: PropTypes.string.isRequired,
};
