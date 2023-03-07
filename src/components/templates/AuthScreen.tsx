/** 外部import */
import { FC, memo, ReactNode } from 'react';
import styled from 'styled-components';

/** 内部import */
import { LogoBig } from '../atoms';

/** types */
type Props = {
  logo: string;
  children: ReactNode;
};

export const AuthScreen: FC<Props> = memo((props) => {
  const { logo, children } = props;

  return (
    <SBody>
      <SInfoWrapper>
        <LogoBig>{logo}</LogoBig>
        {children}
      </SInfoWrapper>
    </SBody>
  );
});

AuthScreen.displayName = 'AuthScreen';

/** style */
const SBody = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const SInfoWrapper = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  max-width: 600px;
  text-align: center;
`;
