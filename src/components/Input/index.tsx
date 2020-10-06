import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({name, icon: Icon, ...rest}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  /** STATES */
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  /** EFFECTS */
  useEffect(()=>{
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  },[fieldName, registerField])

  /** CALLBACKS */
  // Só vai ser recriado quando for chamado. Não vai recriar a função toda vez que renderiar a função pai,
  // nesse caso, Input.
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  },[])

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  },[])

  return (
    <Container isFilled={isFilled} isFocused = {isFocused}>
      {Icon && <Icon size={20}/>}
      <input
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
}

export default Input;
