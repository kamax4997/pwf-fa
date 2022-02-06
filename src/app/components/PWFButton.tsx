import React from "react"
import { Button } from '@material-ui/core'

interface ICustomButtonProps {
  title: string
  disabled: boolean
  onClick: () => void
}

const PWFButton = (props: ICustomButtonProps) => {
  const { title, disabled, onClick } = props
  return (
    <Button disabled={disabled} onClick={onClick} className="pwf-button">{title}</Button>
  )
}

export default PWFButton
