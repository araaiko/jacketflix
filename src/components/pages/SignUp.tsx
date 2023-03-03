/** 外部import */
import { FC } from 'react';

/** 内部import */
import { AuthScreen } from '../templates';
import { SignUpForm } from '../organisms';

export const SignUp: FC = () => {
  return (
    <AuthScreen logo={'JACKETFLIX'}>
      <SignUpForm />
    </AuthScreen>
  );
};
