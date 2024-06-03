import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import { Post } from "./Post/Post";
import "./styles.css";

export const Posts = ({ setCurrentId, handleOpen }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts?.length && !isLoading)
    return (
      <div className="card p-5 d-flex align-items-center justify-content-center ">
        <h5 className="fw-bold">Posts are not available yet!</h5>
      </div>
    );
  return (
    <div>
      {isLoading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <Grid
          className="d-flex align-items-center flex-wrap"
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6} lg={4}>
              <Post
                post={post}
                setCurrentId={setCurrentId}
                handleOpen={handleOpen}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};
