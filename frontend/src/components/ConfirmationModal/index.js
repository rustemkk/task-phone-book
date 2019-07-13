import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/Button';

import s from './index.module.scss';


const ConfirmationModal = ({ callback, onHideModal, text }) => {

  const handleYes = (values) => {
    callback();
    onHideModal();
  }

  const handleNo = () => {
    onHideModal();
  }

  return (
    <>
      <div className={s.Data}>
        {text}
      </div>
      <div className={s.Bottom}>
        <Button title="Yes" onClick={handleYes} type="button" />
        <Button className={s.ButtonDelete} onClick={handleNo} title="No" type="button" />
      </div>
    </>
  );
}

ConfirmationModal.propTypes = {
  callback: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default ConfirmationModal;