import React from 'react';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { useDispatch } from 'react-redux';
import { fetchDeletePost } from '../../redux/slices/posts';
import { Link, Navigate } from "react-router-dom";
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ViewIcon from '@mui/icons-material/VisibilityOutlined';
import styles from './Post.module.scss';



export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  loadCount,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  tagChanger,
  isEditable = false,
  isAuth,
}) => {

  const dispatch = useDispatch();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('are you want delete it?')) {
      dispatch(fetchDeletePost(id))
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>

      {isEditable && (
        <div className={styles.editButtons}>

          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>

          <IconButton onClick={onClickRemove} color='secondary'>
            <DeleteIcon />
          </IconButton>

        </div>
      )}

      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}

      <div className={styles.wrapper}>

        <UserInfo {...user} additionalText={createdAt} />

        <div className={styles.indention}>

          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>

          {isAuth &&
            <ul className={styles.tags}>

              {tags.map((name) => (
                <li key={name}>
                  
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      tagChanger(name);
                    }}> #{name}</div>

                </li>
              ))}
            </ul>
          }

          {children && <div className={styles.content}>{children}</div>}

          <ul className={styles.postDetails}>

            <li>
              <ViewIcon />
              <span>{viewsCount}</span>
            </li>

            <li>
              <DownloadIcon />
              <span>{loadCount}</span>
            </li>

            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};
