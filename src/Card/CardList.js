import React, { useState, useEffect } from "react";
import Cart from ".//Cart";
import CardForm from "./CardForm";

export default function CardList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshPosts = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPosts(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refreshPosts();
  }, [posts]);

  const container = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff9",
  };

  return (
    <div style={container}>
      <CardForm userName={"Abdullah"} userId={5} refreshPosts={refreshPosts} />
      {/*  {localStorage.getItem("currentUser") == null ? (
        ""
      ) : (
        <CardForm
          userName={localStorage.getItem("currentUser ")}
          userId={localStorage.getItem("userId")}
          refreshPosts={refreshPosts}
        />
      )}
 */}
      {posts.map((post,i) => (
        <Cart key={i}
          likes={post.likes}
          postId={post.id}
          userId={post.userId}
          userName={"wdfgh"}
          title={post.title}
          text={post.text}
        ></Cart>
      ))}
    </div>
  );
}
