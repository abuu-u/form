import styled from '@emotion/styled';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import * as React from 'react';
import { MongoDBRealmError } from 'realm-web';
import * as yup from 'yup';
import Loading from '../src/Loading';
import { State } from '../src/types';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function FormLayout({
  title,
  onSubmit,
  state,
  error,
}: {
  title: string;
  onSubmit: (email: string, password: string) => void;
  state: State;
  error?: MongoDBRealmError;
}) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: ({ email, password }) => {
      onSubmit(email, password);
    },
  });

  return (
    <Container maxWidth="xs">
      <Loading open={state === State.loading} />
      <Form onSubmit={formik.handleSubmit}>
        <Typography variant="h1" align="center">
          {title}
        </Typography>

        {state === State.error && (
          <Alert severity="error">
            <AlertTitle>{error?.statusText}</AlertTitle>
            {error?.error}
          </Alert>
        )}

        <TextField
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          id="email"
          type="email"
          required={true}
          name="email"
          placeholder="example@email.com"
          label="Email"
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          id="password"
          type="password"
          required={true}
          name="password"
          label="Password"
          placeholder="********"
          variant="outlined"
          fullWidth={true}
        />

        <Button type="submit" fullWidth={true} size="large" variant="contained">
          {title}
        </Button>
      </Form>
    </Container>
  );
}
