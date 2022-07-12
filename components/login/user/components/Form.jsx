import { React, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { useSession, signIn, signOut } from 'next-auth/client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Form = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [session] = useSession();

  const router = useRouter();

  const logoutHandler = () => {
    signOut();
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // optional: Add Validation

    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (!result.error) {
      router.replace(`/profile/users/${form.email}`);
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          gutterBottom
          sx={{
            color: 'text.secondary',
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
        >
          Login
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Welcome Back
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Enter you email
            </Typography>
            <TextField
              required
              name="email"
              fullWidth
              value={form.email ?? ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'streched', sm: 'center' }}
              justifyContent="space-between"
              sx={{
                width: 1,
                mb: 2,
              }}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant="subtitle2">Enter your password</Typography>
              </Box>
              <Typography variant="subtitle2">
                <Link href="/" passHref>
                  <Button
                    variant="text"
                    disableRipple
                    sx={{
                      '&:hover': {
                        background: 'transparent',
                      },
                    }}
                  >
                    Forgot your password?
                  </Button>
                </Link>
              </Typography>
            </Box>
            <TextField
              variant="outlined"
              name="password"
              type="password"
              fullWidth
              value={form.password ?? ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ sx: 'stretched', sm: 'center' }}
              justifyContent="space-between"
              sx={{
                width: 1,
                maxWidth: 600,
                margin: '0 auto',
              }}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant="subtitle2">
                  Don`&apos;`t have an account yet?{' '}
                  <Link href="/userSignUp" passHref>
                    <Button
                      variant="text"
                      disableRipple
                      sx={{
                        '&:hover': {
                          background: 'transparent',
                        },
                      }}
                    >
                      Sign up here
                    </Button>
                  </Link>
                </Typography>
              </Box>
              {!session ? (
                <Button size="large" variant="contained" type="submit">
                  Login
                </Button>
              ) : (
                <Button
                  size="large"
                  variant="contained"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
