import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import PersonIcon from '@mui/icons-material/Person'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'

const emails = ['username@gmail.com', 'user02@gmail.com']
function SimpleDialog(props) {
  const { onClose, selectedValue, open, func } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = value => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>رمز کاربر ریست شود؟</DialogTitle>
      <div>
        <Button
          onClick={() => {
            handleListItemClick('addAccount')
            func()
          }}
        >
          بله
        </Button>
        <Button onClick={() => handleListItemClick('addAccount')}>خیر</Button>
      </div>
    </Dialog>
  )
}
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
}
const columns = [
  { field: 'userId', headerName: 'آیدی', width: 60, headerAlign: 'center' },
  {
    field: 'username',
    headerName: 'نام کاربری',
    width: 150,
    editable: false,
    headerAlign: 'center'
  },
  {
    field: 'namefa',
    headerName: 'نام',
    width: 150,
    editable: false,
    headerAlign: 'center'
  },
  {
    field: 'mobile',
    headerName: 'تلفن',
    width: 160,
    editable: false,
    headerAlign: 'center'
  },
  {
    field: 'nationalCode',
    headerName: 'کد ملی',
    width: 140,
    editable: false,
    headerAlign: 'center'
  },
  {
    field: 'rolenamefa',
    headerName: 'سطح کاربر',
    width: 90,
    editable: false,
    headerAlign: 'center'
  },
  {
    field: 'userStatus',
    headerName: 'وضعیت',
    width: 80,
    editable: false,
    headerAlign: 'center'
  },
  {
    field: 'email',
    headerName: 'ایمیل',
    width: 300,
    editable: false
  }
]

export default function DataGridDemo() {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)
  const datas = JSON.stringify({
    pageIndex: 1,
    pageSize: 25,
    username: null,
    userRole: 'sa',
    nameFa: null,
    nationalCode: null
  })
  const [selectedValue, setSelectedValue] = React.useState(emails[1])

  const handleClose = value => {
    setOpen(false)
    setSelectedValue(value)
  }
  const ResetUser = () => {
    console.log(user)
  }
  useEffect(async () => {
    const Send = await fetch('http://nodex.microsis.net/user/list', {
      method: 'POST',
      body: datas,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'X-Requested-With',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(err => {
      console.log(err)
    })
    const Response = await Send.json()
    setRows([{ ...Response.data[0], btn: 'ریست' }])
  }, [])
  return (
    <Box sx={{ height: 625, width: '100%' }}>
      <DataGrid
        sx={{
          boxShadow: 2,
          backgroundColor: '#c6d7eb',
          color: '#320d3e',
          fontWeight: 800,
          fontSize: 18,
          direction: 'rtl',
          '& .super-app-theme--cell': {
            backgroundColor: 'darkgrey',
            color: 'black',
            fontWeight: '600',
            cursor: 'pointer',
            alignContent: 'center',
            outline: '8px solid #c6d7eb',
            outlineOffset: '-8px',
            justifyContent: 'center',
            boxShadow: '0.5px 0.5px 1px'
          },
          '& .super-app-theme--cell:hover': {
            boxShadow: '0 0 0',
            outline: '10px solid #c6d7eb',
            outlineOffset: '-10px'
          }
        }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellClick={event => {
          if (event.field === 'btn') {
            // setUser(event)
            // setOpen(true)
          }
        }}
        getRowId={row => row.userId}
        experimentalFeatures={{ newEditingApi: true }}
      />
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} func={ResetUser} />
    </Box>
  )
}
