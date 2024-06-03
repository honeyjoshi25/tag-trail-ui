import React from "react";
import "./styles.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../Redux/Actions/Posts_Actions";
import { useNavigate } from "react-router-dom";
import { ThumbUp, ThumbUpOffAlt, Delete, MoreVert } from "@mui/icons-material";

export const Post = ({ post, setCurrentId, handleOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const onClick = () => {
    navigate(`/posts/${post._id}`);
    window.location.reload();
  };
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?.result?._id) ? (
        <>
          <ThumbUp fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUp fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpOffAlt fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <div>
      <Card
        className="postcard d-flex flex-column justify-content-between position-relative"
        raised
        elevation={6}
      >
        <CardMedia
          className="postMedia"
          image={
            post.selectedFiles ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
          onClick={onClick}
        />
        <div className="overlay">
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className="overlay2">
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(post._id);
                handleOpen();
              }}
            >
              <MoreVert fontSize="medium" />
            </Button>
          </div>
        )}

        <div className="details d-flex justify-content-between m-3">
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className="title" gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="homePostDesc"
          >
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className="cardActions d-flex justify-content-between">
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={() => dispatch(likePost(post._id))}
          >
            <Likes />
          </Button>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              size="small"
              color="error"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <Delete fontSize="small" /> Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};
