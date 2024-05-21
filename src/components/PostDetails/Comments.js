import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Typography, TextField } from '@material-ui/core'
import Button from '@mui/material/Button'
import useStyles from './styles'
import { commentPost } from '../../Redux/Actions/Posts_Actions'

export const Comments = ({ post }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const commentsRef = useRef()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('')

  const handleSubmit = async () => {
    const finalComment = `${user.result.name} : ${comment}`
    const newComments = await dispatch(commentPost(finalComment, post._id))
    setComments(newComments)
    setComment('')

    commentsRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6" className='fw-bold'>
            Comments
          </Typography>

          {comments.length > 0 ? comments.map((comment, index) => (
            <Typography gutterBottom variant="subtitle2" key={index}>
              <strong>{comment.split(': ')[0]} </strong>
             <span className='text-muted'> {comment.split(':')[1]}</span>
            </Typography>
          )): <span className='text-muted'>There are currently no comments added.</span>}

          <div ref={commentsRef} />
        </div>
        <div className='mt-3'>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Add Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className='w-25'>
          <Button
            fullWidth
            variant="contained"
            disabled={!comment}
            onClick={handleSubmit}
            className='muiContainedBtn mt-3'
          >
            Comment
          </Button></div>
        </div>
      </div>
    </div>
  )
}
