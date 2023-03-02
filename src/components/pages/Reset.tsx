/** 外部import */
import { FC } from 'react';

/** 内部import */
import { ResetScreen } from '../templates';

export const Reset: FC = () => {
  return (
    <ResetScreen
      logo={'JACKETFLIX'}
      pageTitle={'パスワードリセット'}
      leadText={[
        'メールアドレスを入力し、「リセットする」ボタンを押してください。',
        <br key="leadTextBr" />,
        '入力されたアドレス宛にパスワードリセット用のメールをお送りします。',
      ]}
    />
  );
};
