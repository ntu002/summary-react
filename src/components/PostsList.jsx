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

  useEffect(() => {
    async function fetchPost() {
      const response = await  fetch("http://localhost:8080/posts")
      const resData = await response.json();
      setPosts(resData.posts);
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
      {posts.length > 0 && (
        <ul className={classes.posts}>
          <Post author="Author 2" body="Text two" />
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "while" }}>
          <h2>There are no post yet. </h2>
          <p>Start adding some! </p>
        </div>
      )}
    </>
  );
}

export default PostsList;
