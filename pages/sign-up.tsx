import { useRouter } from 'next/router';
import * as React from 'react';
import { MongoDBRealmError } from 'realm-web';
import FormLayout from '../layout/FormLayout';
import { useAuth } from '../lib/realm';
import { State } from '../src/types';

export default function SignUp() {
  const [state, setState] = React.useState(State.idle);
  const [error, setError] = React.useState<MongoDBRealmError>();
  const { signup } = useAuth();
  const router = useRouter();

  return (
    <FormLayout
      title="Sign up"
      state={state}
      error={error}
      onSubmit={async (email, password) => {
        setState(State.loading);

        try {
          await signup(email, password);
          setState(State.success);
          router.push('/sign-in');
        } catch (error) {
          setError(error);
          setState(State.error);
        }
      }}
    />
  );
}
