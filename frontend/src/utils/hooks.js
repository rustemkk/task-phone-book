import { useState, useEffect } from 'react';


export const useForm = (callback, validator, initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]); // eslint-disable-line

  const handleSubmit = (event) => {
    event && event.preventDefault();
    setErrors(validator(values));
    setIsSubmitting(true);
  };

  const handleChange = (name, value) => {
    setValues(values => ({ ...values, [name]: value }));
  };

  return { errors, handleChange, handleSubmit, values }
};