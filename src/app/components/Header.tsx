import React, { useState, useCallback } from 'react'
import { Avatar, Menu, MenuItem } from '@material-ui/core'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import logoUrl from '../../assets/images/logo.png'

const Header: React.FC = () => {
  const history = useHistory()

  return (
    <div className="header-container">
      <div>
        <h2 className="header-title">ProWorkflow Timer</h2>
      </div>
    </div>
  )
}

export default Header
