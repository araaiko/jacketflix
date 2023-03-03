/** 外部import */
import { FC } from 'react';
import styled from 'styled-components';

/** types */
type Props = {
  src: string;
  alt: string | undefined;
};

export const Img: FC<Props> = (props) => {
  const { src, alt } = props;

  return (
    <SImg
      src={src}
      alt={alt}
    />
  );
};

/** style */
const SImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
