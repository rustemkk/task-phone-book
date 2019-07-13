import cn from 'classnames';
import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import s from './index.module.scss';


const Button = ({ className, onClick, title, type }) => {
  return (
    <button className={cn(s.Button, className)} onClick={isFunction(onClick) ? onClick : undefined} type={type}>
      {title}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;