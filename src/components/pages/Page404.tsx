/** 外部import */
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/** 内部import */
import { Page404Screen } from '../templates';
import { UserContext } from '../../providers/UserProvider';

export const Page404: FC = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const onClickToTop = (): void => {
    navigate('/');
  };

  return (
    <Page404Screen
      userName={user.username}
      title={'お探しのページが見つかりません'}
      text1={'アクセスしようとしたページは削除、変更されたか、現在利用できない可能性があります。'}
      text2={'恐れ入りますが、以下からトップページへ戻り、改めてお探しいただきますようお願いいたします。'}
      btnText={'トップページへ戻る'}
      onClick={onClickToTop}
    />
  );
};
