import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { Input, Grid, Button, InputLabel } from '@material-ui/core'
import { ITask } from 'utils/types'
import useTimer from 'app/hooks/useTimer'

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
  onTimerOff: (note: string) => void
}

const NoteModal: React.FC<INoteModalProps> = (props: INoteModalProps) => {
  const classes = useStyles()
  const { isOpen, handleClose, currentTask, onTimerOff } = props
  const { startDate } = useTimer()
  
  const defaultNote = React.useMemo(() => {
    return currentTask?.name.concat('-', startDate) as string
  }, [currentTask, startDate])

  const [note, setNote] = React.useState<string>('')


  const onSave = () => {
    if (note.length === 0) {
      onTimerOff(defaultNote)
    } else {
      onTimerOff(note)
    }
    handleClose()
  }

  const onClose = () => {
    handleClose()
    onTimerOff(defaultNote)
  }

  const onChange = (event: any) => {
    setNote(event.target.value as string)
  }

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
                    value={note}
                    onChange={onChange}
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
                <Button variant="contained" color="primary" onClick={onSave}>
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={onClose}>
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
