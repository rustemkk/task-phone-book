import cn from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ClickOutHandler from 'react-onclickout';

import SvgIcon from 'components/SvgIcon';

import s from './index.module.scss';


const DropDown = ({ onSelect, options, placeHolder, selected }) => {

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const selectedOption = options.find(o => o.value === selected);

  const handleSelect = (value) => {
    onSelect(value);
    onUpdateIsDropDownOpen(null, false);
  }

  const onUpdateIsDropDownOpen = (e, value) => {
    e && e.preventDefault();
    setIsDropDownOpen(value);
  }

  return (
    <div className={s.DropDown}>
      <div
        className={s.DropDownTrigger}
        onClick={e => onUpdateIsDropDownOpen(e, !isDropDownOpen)}
      >
        <span className={cn(!selectedOption && s.IsGrey)}>
          {get(selectedOption, 'label', placeHolder || '')}
        </span>
        <SvgIcon className={s.IconArrowSimpleDown} name="arrowDown" size={30} />
      </div>
      {isDropDownOpen &&
        <ClickOutHandler onClickOut={() => onUpdateIsDropDownOpen(null, false)}>
          <div className={s.DropDownContent}>
            {options.map(({ label, value }) =>
              <div className={s.Option} key={value} onClick={() => handleSelect(value)}>{label}</div>
            )}
          </div>
        </ClickOutHandler>
      }
    </div>
  );
}

DropDown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeHolder: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DropDown;
