import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Redux/Actions/Posts_Actions";

export const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (page) dispatch(getPosts(page));
    // eslint-disable-next-line
  }, [page]);
  return (
    <div className="paginate">
      <Pagination
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        className="panigation"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        )}
      />
    </div>
  );
};
