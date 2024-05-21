import * as api from '../../api/index'
import {
  FETCH_ALL,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  FETCH_POSTSBY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT_POST,
} from '../Constants/ActionTypes'

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.FetchPosts(page)
    dispatch({ type: FETCH_ALL, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.FetchPost(id)
    dispatch({ type: FETCH_POST, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data },
    } = await api.FetchPostsBySearch(searchQuery)
    dispatch({ type: FETCH_POSTSBY_SEARCH, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.CreatePost(post)

    dispatch({ type: CREATE_POST, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.UpdatePost(id, post)
    dispatch({ type: UPDATE_POST, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.DeletePost(id)
    dispatch({ type: DELETE_POST, payload: id })
  } catch (error) {
    console.log(error)
  }
}

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'))

  try {
    const { data } = await api.LikePost(id, user?.token)
    dispatch({ type: LIKE_POST, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.CommentPost(value, id)
    dispatch({ type: COMMENT_POST, payload: data })
    return data.comments
  } catch (error) {
    console.log(error)
  }
}
