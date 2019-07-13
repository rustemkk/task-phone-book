import cn from 'classnames';
import { get } from 'lodash';
import { PropTypes } from 'prop-types';
import React from 'react';

import s from './index.module.scss';


const FormInput = ({
  autoFocus,
  className,
  errors,
  handleChange,
  label,
  name,
  placeholder,
  values
}) => {
  return (
    <div className={cn(s.FormInput, className)}>
      <div className={s.Label}>
        {label}
      </div>
      <input
        autoFocus={autoFocus}
        className={cn(s.Input, errors[name] && s.InputError)}
        name={name}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        placeholder={placeholder}
        value={get(values, name) || ''}
      />
      {get(errors, name) &&
        <div className={s.Error}>{get(errors, name)}</div>
      }
    </div>
  );
}


FormInput.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
};

export default FormInput;