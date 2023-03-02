/** 外部import */
import { FC } from 'react';
import { SignInForm } from '../organisms';

/** 内部import */
import { AuthScreen } from '../templates';

export const SignIn: FC = () => {
  return (
    <AuthScreen logo={'JACKETFLIX'}>
      <SignInForm />
    </AuthScreen>
  );
};
