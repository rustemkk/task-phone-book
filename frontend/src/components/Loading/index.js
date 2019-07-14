import PropTypes from 'prop-types';
import React from 'react';

const loadingAnimation = require(`./loading-animation.gif`);


const Loading = ({ className, size }) => (
  <img alt="loading" className={className} height={size} src={loadingAnimation} width={size} />
);

Loading.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

export default Loading;