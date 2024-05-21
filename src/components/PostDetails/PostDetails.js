import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, CircularProgress, Divider } from "@material-ui/core/";
import moment from "moment";
import useStyles from "./styles";
import { getPost, getPostsBySearch } from "../../Redux/Actions/Posts_Actions";
import { Comments } from "./Comments";
import { Header } from "../Header/Header";

export const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
    // eslint-disable-next-line
  }, [post]);

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
    window.location.reload();
  };
  if (isLoading) return <CircularProgress />;

  return (
    <div>
      <Header />
      <div className="container d-flex flex-column card p-5 mt-5">
        <div className="d-flex flex-lg-row flex-column  w-100">
          <div className="col-lg-8 col-12 me-0 me-md-3">
            <Typography
              variant="h5"
              className="fw-bold postTitle"
              component="h5"
              style={{ color: "#181C32" }}
            >
              {post.title}
            </Typography>
            <Typography gutterBottom color="textSecondary" className="fw-bold">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              component="p"
              className="mb-2"
            >
              {post.message}
            </Typography>
            <Typography
              variant="subtitle1"
              className="fw-bold"
              style={{ fontSize: "14px" }}
            >
              Created by:
            </Typography>
            <Typography variant="body2" className="fw-bold">
              <span style={{ color: "#5E6278" }}>{post.name}, </span>
              <span style={{ color: "#A1A5B7" }}>
                {" "}
                {moment(post.createdAt).fromNow()}
              </span>
            </Typography>

            <Divider style={{ margin: "20px 0" }} />

            <Comments post={post} />
            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div className="col-lg-4 col-12">
            <img
              className={classes.media}
              src={
                post.selectedFiles ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={post.title}
            />
          </div>
        </div>
        {!!recommendedPosts.length && (
          <div className={classes.section}>
            <Typography gutterBottom variant="h6" className="fw-bold">
              You might also like
            </Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(
                ({ title, name, message, likes, selectedFiles, _id }) => (
                  <div
                    className="m-5 recommendedPost"
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <Typography
                      gutterBottom
                      variant="h6"
                      style={{ color: "#181C32" }}
                      className="fs-5 fw-bold"
                    >
                      {title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      style={{ color: "#5E6278" }}
                      className="fw-bold"
                    >
                      {name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      style={{ color: "#7E8299" }}
                    >
                      {message}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      <span style={{ color: "#5E6278" }}>Likes: </span>{" "}
                      <span style={{ color: "#A1A5B7" }}> {likes.length} </span>
                    </Typography>
                    <img src={selectedFiles} width="200px" alt="file" />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
