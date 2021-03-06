import React from "react"
import { 
  withStyles, 
  Theme, 
  createStyles, 
  makeStyles 
} from '@material-ui/core/styles'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography
} from '@material-ui/core'
import { ITask, ITimeRecord } from "utils/types"
import TimeEntryRow from "./TimeEntryRow"

interface ITimeEntriesProps {
  task: ITask
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

const TimeEntries: React.FC<ITimeEntriesProps> = (props: ITimeEntriesProps) => {
  const classes = useStyles()
  const { task } = props
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Notes</StyledTableCell>
            <StyledTableCell align="center">Start Date</StyledTableCell>
            <StyledTableCell align="center">End Date</StyledTableCell>
            <StyledTableCell align="center">Time Tracked</StyledTableCell>
            <StyledTableCell align="center">Tracked By</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            task?.timerecords?.map((record: ITimeRecord) => {
              return record && (
                <StyledTableRow key={record.id}>
                  <TimeEntryRow data={record} />
                </StyledTableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TimeEntries
