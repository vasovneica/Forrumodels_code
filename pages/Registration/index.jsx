import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import styles from './Login.module.scss';


export const Registration = () => {

  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch();

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: ""
    },
    mode: "onChange",
  })

  if (isAuth == true) {
    return <Navigate to='/' />
  }

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      console.log(data.payload);
      return alert('failet to login')
    }
    if ('token' in data.payload) {
      console.log('register', data.payload);
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  return (
    <Paper classes={{ root: styles.root }}>

      <Typography classes={{ root: styles.title }} variant='h5'>
        Создание аккаунта
      </Typography>

      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        <TextField
          className={styles.field}
          label='Full name'
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          type='full name'
          {...register('fullName', { required: 'write down fullname' })}
          fullWidth />

        <TextField
          className={styles.field}
          label='E-Mail'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type='email'
          {...register('email', { required: 'write down email' })}
          fullWidth />

        <TextField className={styles.field} label='Пароль'
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'write down password' })}
          fullWidth />

        <Button disabled={!isValid} type='submit' size='large' variant='contained' fullWidth>
          Зарегистрироваться
        </Button>

      </form>
    </Paper>
  );
};
