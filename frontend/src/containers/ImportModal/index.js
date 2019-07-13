import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import Button from 'components/Button';
import DropDown from 'components/DropDown';
import { importContactsFromFile } from 'modules/contacts/actions';

import s from './index.module.scss';


const mapDispatchToProps = {
  importContactsFromFile,
};

const ImportModal = ({ importContactsFromFile, onHideModal }) => {

  const [strategy, setStrategy] = useState();
  const inputFileRef = useRef();

  const handleChange = (e) => {
    importContactsFromFile(strategy, get(e, 'target.files.0'));
  }

  return (
    <>
      <input className={s.InputFile} ref={inputFileRef} type='file' id='single' onChange={handleChange} />
      <DropDown
        onSelect={(value) => setStrategy(value)}
        options={[
          { label: 'Dont check for duplicates in existing contacts', value: 'allNewStrategy' },
          { label: 'For contacts with same name - update phone number', value: 'sameNameStrategy' },
          { label: 'For contacts with same phone number - update name', value: 'samePhoneStrategy' },
        ]}
        placeHolder="Select import strategy"
        selected={strategy}
      />
      <Button onClick={() => inputFileRef.current.click()} title='Import contacts form selected file' type="button" />
    </>
  );
}

ImportModal.propTypes = {
  importContactsFromFile: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ImportModal);