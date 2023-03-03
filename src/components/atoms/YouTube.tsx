/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** types */
type Props = {
  src: string;
};

export const YouTube: FC<Props> = (props) => {
  const { src } = props;

  return (
    <SVideo
      src={src}
      frameBorder="0"
      title="YouTube"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

/** style */
const SVideo = styled.iframe`
  width: 100%;
  height: 100%;
`;
