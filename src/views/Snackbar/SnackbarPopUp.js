import React, { forwardRef, useImperativeHandle } from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
const SnackbarPopUp = forwardRef((props, ref) => {
  ///////////
  const [open, setOpen] = React.useState(false)
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })
  useImperativeHandle(ref, () => ({
    handleClick() {
      console.log('snackBurnsToo')
      setOpen(true)
    }
  }))

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert open={open} onClose={handleClose} severity={props.severity}>
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  )
})

export default SnackbarPopUp
