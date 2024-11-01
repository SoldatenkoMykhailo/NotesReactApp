import React from "react";
import PropTypes from "prop-types";
export default function Header(props) {
  return (
    <>
      <div>
        <p
          style={{
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            fontSize: "40px",
          }}
        >
          {props.head1}
        </p>
        <p
          style={{
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            fontSize: "25px",
          }}
        >
          {props.head2}
        </p>
      </div>
    </>
  );
}

Header.propTypes = {
  head1: PropTypes.string.isRequired,
  head2: PropTypes.string.isRequired,
};
