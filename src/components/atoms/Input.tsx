/** 外部import */
import { ChangeEvent, FC, memo } from 'react';
import styled from 'styled-components';

/** 内部import */
import { colorVariables as c } from '../../style';

/** types */
type Props = {
  label: string | Array<string | JSX.Element>;
  htmlFor: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  id: string;
};

export const Input: FC<Props> = memo((props) => {
  const { label, htmlFor, value, onChange, type, id } = props;

  return (
    <>
      <SLabelWrapper>
        <SLabel htmlFor={htmlFor}>{label}</SLabel>
      </SLabelWrapper>
      <SInputWrapper>
        <SInput type={type} id={id} value={value} onChange={onChange} />
      </SInputWrapper>
    </>
  );
});

Input.displayName = 'Input';

/** style */
const SLabelWrapper = styled.div`
  width: 100%;
  margin-top: 0;
  text-align: left;
`;

const SLabel = styled.label`
  font-weight: bold;
  font-size: 16px;

  span {
    font-size: 12px;
    padding-left: 10px;
    color: ${c.point};
  }

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const SInputWrapper = styled.div`
  width: 100%;
  margin-top: 8px;
`;

const SInput = styled.input`
  font-family: inherit;
  font-weight: normal;
  width: 100%;
  height: 48px;
  padding-left: 14px;
  padding-right: 14px;
  border-radius: 8px;
  color: ${c.primary};
  appearance: none;
  background-color: ${c.secondary};
  font-size: 16px;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      outline: none;
      border: 3px solid ${c.point};
      border-radius: 8px;
    }
  }

  &:focus {
    outline: none;
    border: 3px solid ${c.point};
    border-radius: 8px;
  }

  &:focus-visible {
    outline: none;
    border: 3px solid ${c.point};
    border-radius: 8px;
  }
`;
