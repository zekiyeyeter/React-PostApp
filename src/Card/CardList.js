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
  }, []);

  const container = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff9",
  };

  return (
    <div style={container}>
      
        {localStorage.getItem("currentUser") == null ? "": 
        <CardForm
          userName={localStorage.getItem("userName")}
          userId={localStorage.getItem("currentUser")}
          refreshPosts={refreshPosts}
        />
      }
 
      {posts.map((post,i) => (
        <Cart key={i}
          likes={post.likes}
          postId={post.id}
          userId={post.userId}
          userName={post.userName}
          title={post.title}
          text={post.text}
        ></Cart>
      ))}
    </div>
  );
}
