import { useState, useEffect } from "react";

import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostsList.module.css";
import Modal from "./Modal";
import { MdAddTask } from "react-icons/md";

function PostsList({ isPosting, onStopPosting }) {
  //   let modalContent;

  //   if (modalIsVisile) {
  //     modalContent = (
  //       <Modal onClose={hideModalHandler}>
  //         <NewPost
  //           onBodyChange={bodyChangeHandler}
  //           onAuthorChange={authorChangeHandler}
  //         />
  //       </Modal>
  //     );
  //   }

  // fetch('http://localhost:8080/posts').then(response => response.json()).then(data => {
  //   setPosts(data.posts);
  // });

  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      setIsFetching(true);
      const response = await fetch("http://localhost:8080/posts");
      const resData = await response.json();
      setPosts(resData.posts);
      setIsFetching(false);
    }

    fetchPost();
  }, []);

  function addPostHandle(postData) {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //setPosts([postData, ...posts]);
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandle} />
        </Modal>
      )}

      {/* <NewPost
        onBodyChange={bodyChangeHandler}
        onAuthorChange={authorChangeHandler}
      /> */}

      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: "center", color: "while" }}>
          <h2>There are no post yet. </h2>
          <p>Start adding some! </p>
        </div>
      )}
      {isFetching && (
        <p style={{ textAlign: "center", color: "while" }}>Loading posts... </p>
      )}
    </>
  );
}

export default PostsList;
