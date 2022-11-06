import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cart from ".//Cart";
import CardForm from "./CardForm";

export default function CardList() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    const refreshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setIsLoaded(true);
                    setPosts(result.reverse());
                },
                (error) => {
                    navigate(0)
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
        isLoaded !== true ?
            <div>Loading</div> :
            <div style={container}>
                {localStorage.getItem("currentUser") == null ? "" :
                    <CardForm
                        userName={localStorage.getItem("userName")}
                        userId={localStorage.getItem("currentUser")}
                        refreshPosts={()=>refreshPosts()}
                    />
                }

                {posts.map((post, i) => (
                    <Cart key={i}
                          likes={post.likes}
                          postId={post.id}
                          userId={post.user.id}
                          userName={post.userName}
                          title={post.title}
                          text={post.text}
                    ></Cart>
                ))}
            </div>
    );
}
