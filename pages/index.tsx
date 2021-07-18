import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import * as React from 'react';
import { useAuth } from '../lib/realm';
import Link from '../src/Link';
import Loading from '../src/Loading';
import { State } from '../src/types';

export default function Index() {
  const [state, setState] = React.useState(State.idle);
  const { user, signout } = useAuth();

  return (
    <Container
      maxWidth="xs"
      sx={{ mt: '50px', display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      {user ? (
        <>
          <Loading open={state === State.loading} />
          <Button
            fullWidth={true}
            size="large"
            variant="contained"
            onClick={async () => {
              setState(State.loading);

              await signout();

              setState(State.success);
            }}
          >
            Sign out
          </Button>
        </>
      ) : (
        <>
          <Link href="/sign-in">
            <Button fullWidth={true} size="large" variant="contained">
              Sign in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button fullWidth={true} size="large" variant="contained">
              Sign up
            </Button>
          </Link>
        </>
      )}
    </Container>
  );
}
