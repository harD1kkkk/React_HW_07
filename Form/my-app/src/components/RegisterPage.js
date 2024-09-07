import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box } from '@mui/material';

function RegisterPage() {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.email === values.email);

    if (userExists) {
      alert('User with this email already exists.');
    } else {
      users.push(values);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful!');
      navigate('/login'); // Перехід до сторінки логіну після успішної реєстрації
    }
  };

  return (
    <Box sx={styles.card}>
      <Typography variant="h5" component="div" gutterBottom>
        Register
      </Typography>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form>
            <Box sx={styles.formGroup}>
              <Field
                name="username"
                as={TextField}
                variant="outlined"
                label="Username"
                fullWidth
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
            </Box>

            <Box sx={styles.formGroup}>
              <Field
                name="email"
                as={TextField}
                variant="outlined"
                label="Email"
                fullWidth
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>

            <Box sx={styles.formGroup}>
              <Field
                name="password"
                as={TextField}
                variant="outlined"
                label="Password"
                type="password"
                fullWidth
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
    width: '400px',
    margin: '0 auto',
    marginTop: '50px',
  },
  formGroup: {
    marginBottom: '1rem',
  },
};

export default RegisterPage;