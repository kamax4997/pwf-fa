import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { Typography, Input, Grid, Button, InputLabel } from '@material-ui/core'
import { ITask } from 'utils/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      minWidth: 360,
      textAlign: 'center',
      borderRadius: 8
    },
    noteInput: {
      width: '100%'
    }
  }),
)

interface INoteModalProps {
  isOpen: boolean
  currentTask: ITask | undefined
  handleClose: () => void
}

const NoteModal: React.FC<INoteModalProps> = (props: INoteModalProps) => {
  const classes = useStyles()
  const { isOpen, handleClose,currentTask } = props

  return (
    <div>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item className={classes.noteInput}>
                <form className={classes.noteInput} noValidate autoComplete="off">
                  <InputLabel id="task-select-label">Add your note</InputLabel>
                  <Input 
                    defaultValue={currentTask?.name.concat('-', '')}
                    placeholder="Placeholder"
                    multiline
                    rows={3}
                    style={{ width: '100%' }}
                    inputProps={{ 'aria-label': 'description' }} />
                </form>
              </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent="flex-end">
              <Grid item>
                <Button variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default NoteModal
