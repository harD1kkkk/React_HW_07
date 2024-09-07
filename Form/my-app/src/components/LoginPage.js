import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, Link } from '@mui/material';

function LoginPage({ closeModal }) {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user)); // Зберігаємо поточного користувача
      alert('Login successful!');
      closeModal(); // Закриваємо модальне вікно після успішного входу
      navigate('/'); // Перехід на головну сторінку
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
    <Box sx={styles.card}>
      <Typography variant="h5" component="div" gutterBottom>
        Login
      </Typography>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form>
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Typography sx={styles.registerText}>
        Don't have an account? <Link href="/register" onClick={closeModal}>Register</Link>
      </Typography>
    </Box>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  registerText: {
    marginTop: '1rem',
    fontSize: '0.9rem',
  },
};

export default LoginPage;