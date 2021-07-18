## Getting Started

### 1. Clone the repository and install dependancies

```
git clone https://github.com/abuu-u/form.git
cd form
yarn
```

### 2. Create Realm App and enable Email/Password Authentication

1. [Create Realm App](https://docs.mongodb.com/realm/get-started/create-realm-app/)
2. Enable [Email/Password Authentication](https://docs.mongodb.com/realm/authentication/email-password/#email-password-authentication) with `Automatically Confirm Users` option selected

### 3. Configure your local environment

Create .env.local file in the root folder and set `NEXT_PUBLIC_REALM_APP_ID` [Find a Realm App ID](https://docs.mongodb.com/realm/get-started/find-your-project-or-app-id/#find-a-realm-application-id):

```bash
NEXT_PUBLIC_REALM_APP_ID=<YOUR REALM APP ID>
```

### 4. Start the application

To run your site locally, use:

```
yarn dev
```

To run it it production mode, use:

```
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
