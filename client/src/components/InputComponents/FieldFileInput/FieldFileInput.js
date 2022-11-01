import React from 'react';
import { useField } from 'formik';

const FieldFileInput = (props) => {
  const {
    fileUploadContainer, labelClass, fileNameClass, fileInput,
  } = props.classes;

  const [field, meta, helpers] = useField(props.name);
  const { value, ...rest } = field;

  const onChange = (e) => {
    const file = e.target.files[0];
   
      helpers.setValue(file);
  }
const getFileName = () => {
          if (field.value) {
            return field.value.name;
          }
          return '';
        };

  return (
 
          <div className={fileUploadContainer}>
            <label htmlFor="fileInput" className={labelClass} > 
              Choose file
            </label>
            <span id="fileNameContainer" className={fileNameClass}>
              {getFileName()}
            </span>
            <input
              {...rest}
              className={fileInput}
              id="fileInput"
              type="file"
              onChange={onChange}
            />
          </div>
        );
};

export default FieldFileInput;
