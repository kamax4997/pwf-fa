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
  Paper 
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

const TimeEntries = (props: ITimeEntriesProps) => {
  const classes = useStyles()
  const { task } = props

  // return (
  //   <table className="time-entries">
  //     <thead>
  //       <tr>
  //         <th className="p-1">
  //           Notes
  //         </th>
  //         <th className="p-1">
  //           Start Date
  //         </th>
  //         <th className="p-1">
  //           End Date
  //         </th>
  //         <th className="p-1">
  //           Time Tracked
  //         </th>
  //         <th className="p-1">
  //           Tracked By
  //         </th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {
  //         task?.timerecords?.map((record: ITimeRecord) => {
  //           return record && <TimeEntryRow key={record.id} data={record} />
  //         })
  //       }
  //     </tbody>
  //   </table>
  // )

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Notes</StyledTableCell>
            <StyledTableCell align="center">Start Date</StyledTableCell>
            <StyledTableCell align="center">End Date</StyledTableCell>
            <StyledTableCell align="right">Time Tracked</StyledTableCell>
            <StyledTableCell align="right">Tracked By</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))} */}
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
