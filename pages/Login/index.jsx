import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

export const Login = () => {

  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch();

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: 'onChange',
  })

  console.log(isAuth);
  if (isAuth == true) {
    return <Navigate to='/' />
  }

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    console.log(data);
    if (!data.payload) {
      return alert('failed to login')
    }
    if ('token' in data.payload) {

      window.localStorage.setItem('token', data.payload.token);
    }
  }

  return (
    <Paper classes={{ root: styles.root }}>

      <Typography classes={{ root: styles.title }} variant='h5'>
        Вход в аккаунт
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>

        <TextField
          className={styles.field}
          label='E-Mail'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type='email'
          {...register('email', { required: 'write down email' })}
          fullWidth
        />

        <TextField className={styles.field} label='Пароль'
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'write down password"'})}
          fullWidth />

        <Button disabled={!isValid} type='submit' size='large' variant='contained' fullWidth>
          Войти
        </Button>

      </form>

    </Paper>
  );
};
