import React from 'react'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TableCell } from '@material-ui/core'
import { ITimeRecord } from 'utils/types'
import { formatDate, convertRecordedTime } from 'utils/helpers'

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
      <StyledTableCell align="center" component="th" scope="row">
        {data.notes}
      </StyledTableCell>
      <StyledTableCell align="center">
        {formatDate(new Date(data?.startdate)) || "-"}
      </StyledTableCell>
      <StyledTableCell align="center">
        {formatDate(new Date(data?.enddate)) || "-"}
      </StyledTableCell>
      <StyledTableCell align="center">
        {convertRecordedTime(data?.timespent)}
      </StyledTableCell>
      <StyledTableCell align="center">
        {data?.contact.fullname}
      </StyledTableCell>
    </>
  )
}

export default TimeEntryRow
