import {useState} from 'react';

export const useField = (type, initValue) => {
  const [value, setValue] = useState(initValue);

  const onChange = event => {
    setValue(event.target.value)
  }

  const onReset = event => {
    setValue(initValue)
  }

  return {type, value, onChange, onReset}
}
