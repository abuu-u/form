import { createContext, ReactNode, useContext, useState } from 'react';
import * as Realm from 'realm-web';

const app: Realm.App = new Realm.App({
  id: process.env.NEXT_PUBLIC_REALM_APP_ID!,
});

export type EmailPassword = (
  email: string,
  password: string,
) => Promise<void | Realm.User>;

interface AuthContext {
  user: Realm.User | null;
  signin: EmailPassword;
  signup: EmailPassword;
  signout: () => Promise<void>;
}

const authContextDefaultValues: AuthContext = {
  user: app.currentUser,
  signin: () => Promise.reject(),
  signup: () => Promise.reject(),
  signout: () => Promise.reject(),
};

const authContext = createContext<AuthContext>(authContextDefaultValues);

export const ProvideAuth = ({ children }: { children: ReactNode }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState<Realm.User | null>(app.currentUser);

  const signin: EmailPassword = async (email, password) => {
    const credentials = Realm.Credentials.emailPassword(email, password);

    try {
      const user = await app.logIn(credentials);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const signup: EmailPassword = (email, password) => {
    return app.emailPasswordAuth.registerUser(email, password);
  };

  const signout = () => {
    if (app.currentUser) {
      app.currentUser.logOut();
      setUser(null);

      return Promise.resolve();
    }

    return Promise.reject();
  };

  return {
    user,
    signin,
    signup,
    signout,
  };
};
