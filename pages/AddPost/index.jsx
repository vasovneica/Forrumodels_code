import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

import axios from '../../axios.js';

export const AddPost = () => {

  const { id } = useParams()

  const isAuth = useSelector(selectIsAuth);

  const navigate = useNavigate();

  const [isLoading, setLoading] = React.useState(false);

  const [text, setText] = React.useState('');

  const [title, setTitle] = React.useState('');

  const [tags, setTags] = React.useState('');

  const [imageUrl, setImageUrl] = React.useState('');

  const [secondImageUrl, setSecondImageUrl] = React.useState('');

  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url)
      console.log(data.url);

    } catch (error) {
      console.warn(error)
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");

  };

  // dependence for Material UI
  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  // dependence for SimpleMDE

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );


  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        secondImageUrl,
        tags,
        text
      }

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;
      console.log(id);
      navigate(`/posts/${_id}`)

    } catch (error) {
      if (error.response) {
        console.log('error.response', error.response)

      } else if (error.request) {
        console.log('error.request', error.request)

      } else if (error.message) {
        console.log('error.message', error.message)
      }
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`)
        .then(({ data }) => {
          console.log(data, 'ssdds')
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags);

        })
        .catch((err) => console.log(err));
    }
  },
    []);




  if (!window.localStorage.getItem('token') & !isAuth) {
    return <Navigate to="/" />
  }
  return (
    
    <Paper style={{ padding: 30 }}>

      <Button onClick={() => inputFileRef.current.click()} variant='outlined' size='large'>
        Загрузить превью
      </Button>

      <input ref={inputFileRef} type='file' onChange={handleChangeFile} hidden />

      {imageUrl && (<>
        <Button variant='contained' color='error' onClick={onClickRemoveImage}>
          Удалить
        </Button>
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt='Uploaded' />
      </>
      )}

      <br />
      <br />


      <TextField
        classes={{ root: styles.title }}
        variant='standard'
        placeholder='Заголовок статьи...'
        fullWidth
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField classes={{ root: styles.tags }}
        variant='standard'
        placeholder='Тэги'
        onChange={(e) => setTags(e.target.value)}
        fullWidth />

      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />

      <div className={styles.buttons}>

        <Button onClick={onSubmit} size='large' type='submit' variant='contained'>
          {isEditing ? 'save' : 'public'}
        </Button>

        <a href='/'>
          <Button size='large'>Отмена</Button>
        </a>

      </div>

    </Paper>
  );
};
