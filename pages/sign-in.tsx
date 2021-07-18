import { useRouter } from 'next/router';
import * as React from 'react';
import { MongoDBRealmError } from 'realm-web';
import FormLayout from '../layout/FormLayout';
import { useAuth } from '../lib/realm';
import { State } from '../src/types';

export default function SignIn() {
  const [state, setState] = React.useState(State.idle);
  const [error, setError] = React.useState<MongoDBRealmError>();
  const { user, signin } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [router, user]);

  return (
    <FormLayout
      title="Sign in"
      state={state}
      error={error}
      onSubmit={async (email, password) => {
        setState(State.loading);

        try {
          await signin(email, password);
          setState(State.success);
          router.push('/');
        } catch (error) {
          setError(error);
          setState(State.error);
        }
      }}
    />
  );
}
