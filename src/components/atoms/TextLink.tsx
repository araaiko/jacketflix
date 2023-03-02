/** 外部import */
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/** 内部import */
import { colorVariables as c } from '../../style';

/** types */
type Props = {
  children: ReactNode;
  link: string;
}

export const TextLink: FC<Props> = (props) => {
  const { children, link} = props;

  return <SLink to={link}>{children}</SLink>;
}

/** style */
const SLink = styled(Link)`
  color: ${c.secondary};
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;