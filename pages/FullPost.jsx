import React from 'react';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import ReactMarkdown from 'react-markdown';


export const FullPost = () => {

  const [data, setData] = React.useState();

  const [isLoading, setLoading] = React.useState(true);

  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    }).catch((error) => {
      console.warn(error);
      alert('trouble to get article')

    })
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        // imageUrl={data.imgFGH ? `http://localhost:4444${data.imageUrl}`:""}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
        {/*       <p>
  {data.text}
        </p> */}
      </Post>
      
      <CommentsBlock
        items={items}
        isLoading={false}
      >

        <Index id={data._id} />

      </CommentsBlock>
    </>
  );
};
