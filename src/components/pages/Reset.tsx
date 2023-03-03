/** 外部import */
import { FC } from 'react';
import { ResetForm } from '../organisms';

/** 内部import */
import { AuthScreen } from '../templates';

export const Reset: FC = () => {
  return (
    <AuthScreen logo={'JACKETFLIX'}>
      <ResetForm />
    </AuthScreen>
  );
};
