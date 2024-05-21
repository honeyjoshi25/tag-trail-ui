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

export const postReducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }

    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] }

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post,
        ),
      }

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post,
        ),
      }

    case COMMENT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload
          }

          return post
        }),
      }

    case FETCH_POSTSBY_SEARCH:
      return { ...state, posts: action.payload }

    case FETCH_POST:
      return { ...state, post: action.payload }

    case START_LOADING:
      return { ...state, isLoading: true }

    case END_LOADING:
      return { ...state, isLoading: false }

    default:
      return state
  }
}

export default postReducer
