import React from "react";
import { useState } from "react";
import { Posts } from "../Posts/Posts";
import { Form } from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../Redux/Actions/Posts_Actions";
import { Paginate } from "../Pagination/Paginate";
import { TextField } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { Header } from "../Header/Header";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tags) => tags !== tagToDelete));
  const handleSubmit = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <Header />
      <div className="container d-flex flex-column flex-lg-row mb-3 mt-5">
        <div className="appLeft col-12 col-lg-3 me-0 me-lg-3">
          <div className="searchBar card p-4 rounded">
            <TextField
              name="searchMemory"
              variant="outlined"
              label="Search Post"
              fullWidth
              value={search}
              className="mb-3"
              onChange={(e) => setSearch(e.target.value)}
            />
            <ChipInput
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search Tags"
              variant="outlined"
              fullWidth
              className="mb-3"
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              className="muiContainedBtn mb-3"
            >
              Submit
            </Button>
            <Button variant="outlined" className="muiOutlinedBtn" onClick={handleOpen}>
              Create Post
            </Button>
            <Form currentId={currentId} setCurrentId={setCurrentId} open={open} handleClose={handleClose}/>
          </div>
         
        </div>

        <div className="appRight d-flex flex-column col-12 col-lg-9 mt-3 mt-lg-0">
          <Posts setCurrentId={setCurrentId} handleOpen={handleOpen}/>
          {!searchQuery && !tags.length && (
          <div className="pagination mt-5 d-flex justify-content-center ">
            <Paginate page={page} />
          </div>
        )}
        </div>

       
      </div>
    </div>
  );
};
