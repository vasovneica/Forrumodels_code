import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


export const Header = () => {

  let isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const [isOwner, setIsOwner] = useState('');

  let user = useSelector((state) => state.auth.data);

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log out?'));
    dispatch(logout());
    window.localStorage.removeItem('token');
  };

  useEffect(() => {
    setIsOwner(user?.owner == '13639752');
  }, [user])

  return (
    <div className={styles.root}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>

          <Link className={styles.logo} to='/'>
            <div>Forrumodels</div>
          </Link>

          <div className={styles.buttons}>
            {isAuth ? (<>
              {isOwner && <Link to='/add-post'>
                <Button variant='outlined'>New article</Button>
              </Link>}
              <Button onClick={onClickLogout} variant='contained' color='error' >Sign out</Button>
            </>) :
              (<>
                <Link to='/login'>
                  <Button variant='outlined'>Войти</Button>
                </Link>
                <Link to='/register'>
                  <Button variant='contained'>Создать аккаунт</Button>
                </Link>
              </>)}
          </div>
        </div>
      </Container>
    </div>
  );
};
