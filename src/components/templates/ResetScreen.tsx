/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import { H2Title, LogoBig } from '../atoms';
import { ResetForm } from '../organisms';

/** types */
type Props = {
  logo: string;
  pageTitle: string;
  leadText: Array<string | JSX.Element>;
};

export const ResetScreen: FC<Props> = (props) => {
  const { logo, pageTitle, leadText } = props;

  return (
    <SBody>
      <SInfoWrapper>
        <LogoBig>{logo}</LogoBig>

        <STitleWrapper>
          <H2Title fontSize={'clamp(24px, 4.5vw, 32px)'}>{pageTitle}</H2Title>
        </STitleWrapper>

        <SLead>{leadText}</SLead>

        <ResetForm />
      </SInfoWrapper>
    </SBody>
  );
};

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

const STitleWrapper = styled.div`
  margin-top: 16px;

  @media (min-width: 768px) {
    margin-top: 24px;
  }

  @media (min-width: 1024px) {
    margin-top: 32px;
  }
`;

const SLead = styled.p`
  margin-top: 24px;
`;
