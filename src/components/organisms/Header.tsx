/** 外部import */
import { FC, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { HeartIcon, ExitIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

/** 内部import */
import { auth } from '../../firebase';
import { UserContext } from '../../providers/UserProvider';
import { LogoBase, LogoWithLink } from '../atoms';

/** types */
type Props = {
  home?: boolean;
  userName: string;
};

type MenuItems = Array<{
  menuName: string;
  icon: JSX.Element;
  onClick: () => void;
}>;

export const Header: FC<Props> = (props) => {
  const { home = false, userName } = props;
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const onClickToSignOut = (): void => {
    void signOut(auth).then(() => {
      setUser({
        isSignedIn: false,
        role: '',
        uid: '',
        username: '',
      });
      navigate('/signin');
    });
  };

  const onClickToMyList = (): void => {
    navigate('/mylist');
  };

  // メニュー項目（map関数でイテレート）
  const menuItems: MenuItems = [
    {
      menuName: 'MyList',
      icon: <HeartIcon />,
      onClick: onClickToMyList,
    },
    {
      menuName: 'SignOut',
      icon: <ExitIcon />,
      onClick: onClickToSignOut,
    },
  ];

  useEffect(() => {
    const handleShow = (): void => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleShow);
    return () => {
      window.removeEventListener('scroll', handleShow);
    };
  }, []);

  return (
    <SHeader show={show}>
      {/* logo */}
      {home ? <LogoBase>JACKETFLIX</LogoBase> : <LogoWithLink>JACKETFLIX</LogoWithLink>}

      <SNav>
        {/* user name */}
        <SNavItem>Hi! {userName}</SNavItem>

        {menuItems.map((item, i) => (
          <SNavItem hover onClick={item.onClick} key={i}>
            <SIconWrap>{item.icon}</SIconWrap>
            {item.menuName}
          </SNavItem>
        ))}
      </SNav>

      {/* SP 下部固定 */}
      <SSpNav>
        {menuItems.map((item, i) => (
          <SSpNavItem onClick={item.onClick} key={i}>
            <SIconWrap>{item.icon}</SIconWrap>
            {item.menuName}
          </SSpNavItem>
        ))}
      </SSpNav>
    </SHeader>
  );
};

/** style */
type SHeaderProps = {
  show: boolean;
};
type SNavItemProps = {
  hover?: boolean;
};

const SHeader = styled.header<SHeaderProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 56px;
  z-index: 99999;
  color: #fff;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
  padding-bottom: 10px;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  transition: background-color 0.4s ease;
  background-color: ${({ show }) => (show ? '#000' : 'transparent')};

  @media (min-width: 1024px) {
    padding-left: 32px;
    padding-right: 32px;
  }
`;

const SNav = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (min-width: 768px) {
    gap: 24px;
  }
`;

const SNavItem = styled.li<SNavItemProps>`
  :not(:first-child) {
    display: none;

    @media (min-width: 768px) {
      display: block;
    }
  }
  white-space: nowrap;
  ${({ hover = false }) => hover && ':hover {cursor: pointer; text-decoration: underline;}'}
`;

const SSpNav = styled.ul`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99999;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    display: none;
  }
`;

const SIconWrap = styled.span`
  margin-right: 5px;
`;

const SSpNavItem = styled.li`
  width: 50%;
  height: 48px;
  line-height: 48px;
  text-align: center;
  background-color: rgba(51, 51, 51, 1);

  &:nth-child(n + 2) {
    border-left: 2px solid #fff;
  }
`;
