import React from 'react'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Typography, TableCell } from '@material-ui/core'
import { ITimeRecord } from 'utils/types'
import { formatDate, convertTimeSpent } from 'utils/helpers'

interface ITimeEntryRowProps {
  data: ITimeRecord
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

const TimeEntryRow: React.FC<ITimeEntryRowProps> = (props: ITimeEntryRowProps) => {
  const { data } = props

  return (
    <>
      <StyledTableCell component="th" scope="row">
        <Typography variant="h6">{data.notes}</Typography>
      </StyledTableCell>
      <StyledTableCell align="right">
        {formatDate(new Date(data?.startdate)) || "-"}
      </StyledTableCell>
      <StyledTableCell align="right">
        {formatDate(new Date(data?.enddate)) || "-"}
      </StyledTableCell>
      <StyledTableCell align="right">
        {convertTimeSpent(data?.timespent)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {data?.contact.fullname}
      </StyledTableCell>
    </>
  )
}

export default TimeEntryRow
