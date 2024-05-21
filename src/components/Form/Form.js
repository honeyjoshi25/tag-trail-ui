import React, { useEffect } from "react";
import { Box, Modal, TextField } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Form.css";
import { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../Redux/Actions/Posts_Actions";
import ChipInput from "material-ui-chip-input";
import { IconButton } from "@material-ui/core";
import { Close } from "@mui/icons-material";

export const Form = ({ currentId, setCurrentId, open, handleClose }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const [data, setData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFiles: "",
  });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (post) setData(post);
  }, [post]);
  const handleAddChip = (tag) => {
    setData({ ...data, tags: [...data.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setData({
      ...data,
      tags: data.tags.filter((tag) => tag !== chipToDelete),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, { ...data, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...data, name: user?.result?.name }));
    }
    handleClear();
    window.location.reload();
  };
  const handleClear = () => {
    setCurrentId(null);
    setData({
      title: "",
      message: "",
      tags: "",
      selectedFiles: "",
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="formModal w-50 rounded ">
        <div className="formCard text-center">
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between border-bottom w-100 p-4 formModalHeader">
              {currentId ? (
                <h5 className="fw-bold">Edit Memory</h5>
              ) : (
                <h5 className="fw-bold">Create a Memory</h5>
              )}
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  handleClose();
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            </div>
            <div className="p-4">
              <TextField
                name="title"
                variant="outlined"
                label="Title"
                fullWidth
                value={data.title}
                className="mb-3"
                onChange={handleChange}
              />
              <TextField
                name="message"
                variant="outlined"
                label="Message"
                fullWidth
                multiline
                rows={4}
                value={data.message}
                className="mb-3"
                onChange={handleChange}
              />
              {/* <TextField
              name="tags"
              variant="outlined"
              label="Tags (coma separated)"
              fullWidth
              value={data.tags}
              className='mb-3'
              onChange={handleChange}
            /> */}
              <ChipInput
                name="tags"
                variant="outlined"
                label="Tags"
                fullWidth
                value={data.tags}
                className="mb-3"
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
              />

              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setData({ ...data, selectedFiles: base64 })
                }
              />
            </div>
            <Stack
              spacing={2}
              direction="row"
              className="d-flex justify-content-center border-top forModalFooter p-3"
            >
              <Button
                variant="contained"
                onClick={handleSubmit}
                className="muiContainedBtn"
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  handleClear();
                  handleClose();
                }}
                className="muiOutlinedBtn"
              >
                Clear
              </Button>
            </Stack>
          </form>
        </div>
      </Box>
    </Modal>
  );
};
