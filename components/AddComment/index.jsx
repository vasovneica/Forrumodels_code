import React from "react";
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate, useParams } from "react-router-dom";
import styles from "./AddComment.module.scss";
import axios from '../../axios.js';
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";



export const Index = ({ id }) => {

  const [title, setTitle] = React.useState('');

  const [isLoading, setLoading] = React.useState(false);

  const onSubmit = async () => {

    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        tags: [],
        text
      }

      const { data } = await axios.patch(`/posts/${id}`, fields)

    } catch (error) {

      if (error.response) {

        console.log("error.response", error.response)

      } else if (error.request) {


        console.log("error.request", error.request)

      } else if (error.message) {

        console.log("error.message", error.message)
      }

    }

  };

  return (
    <>
      <div className={styles.root}>

        <Avatar
          classes={{ root: styles.avatar }}
        />
        <div className={styles.form}>

          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />

          <Button variant="contained" onClick={onSubmit}  >Отправить</Button>

        </div>
      </div>
    </>
  );
};
