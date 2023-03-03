/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** 内部import */
import { YouTube } from '../atoms';

/** types */
type Props = {
  src: string;
};

export const Trailer: FC<Props> = (props) => {
  const { src } = props;

  return (
    <SYouTubeWrapper>
      <YouTube src={src} />
    </SYouTubeWrapper>
  );
};

/** style */
const SYouTubeWrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;
