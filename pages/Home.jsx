import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts.js';
import { useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';


export const Home = () => {

  const dispatch = useDispatch();

  const { posts, tags } = useSelector((state) => state.posts);

  const [tabValue, setTabValue] = useState('New');

  const [tag, setTag] = useState('all');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const tagChanger = (newTag) => {
    setTag(newTag);
  }

  const userData = useSelector((state) => state.auth.data);

  let isPostsLoading;
  if (posts.status === 'loading') {
    isPostsLoading = true
  }
  if (posts.status !== 'loading') {
    isPostsLoading = false
  }

  let isTagsLoading;
  if (tags.status === 'loading') {
    isTagsLoading = true
  }
  if (tags.status === 'loaded') {
    isTagsLoading = false
  }

  React.useEffect(() => {

    dispatch(fetchPosts({ tabValue, tag }));
    dispatch(fetchTags());

  }, [tabValue, tag])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }}
        value={tabValue}
        onChange={handleChange}
        aria-label='basic tabs example'>
        <Tab value={'New'} label='Новые' />
        <Tab value={'Popular'} label='Популярные' />
      </Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (<Post key={index} isLoading={isPostsLoading} />) : (
             
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                // loadCount={obj.loadCount}
                commentsCount={3}
                tags={obj.tags}
                tagChanger={tagChanger}
                isEditable={userData?._id === obj.userId}
                isAuth={userData}
              />

            ))}
        </Grid>

        {userData?._id && <Grid xs={4} item>
          
          <TagsBlock tagChanger={tagChanger} sort={tabValue} items={tags.items} isLoading={isTagsLoading} />
     
        </Grid>}
      </Grid>
    </>
  );
};
