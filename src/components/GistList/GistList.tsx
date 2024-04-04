import  './style.scss';
import React from 'react';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, IconButton  } from '@mui/material';

import { CgGitFork  } from 'react-icons/cg';
import { MdStarBorder  } from "react-icons/md";

import {IGistProps} from '../../interfaces/Gist.tsx';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    headerAlign: 'center',
    width: 300,
    renderCell: (params) => (
      <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center', columnGap:15 }}>
      {params.row.owner.avatar_url && <Avatar alt={params.row.owner.login} src={params.row.owner.avatar_url} sx={{ mr: 1, width: '60px', height: '60px' }} />}
      <span>{params.row.owner.login}</span>
    </div>
    )
  },
  {
    field: 'createdAtDate',
    headerName: 'Date',
    width: 130,
    renderCell: (params) => (moment(params.row.created_at).format('DD MMM YYYY'))
  },
  {
    field: 'createdAtTime',
    headerName: 'Time',
    width: 150,
    renderCell: (params) => (moment(params.row.created_at).format('h:mm A'))
  },
  {
    field: 'keywords',
    headerName: 'Keywords',
    width: 200
  },
  {
    field: 'notebook',
    headerName: 'Notebook Name',
    width: 200
  },
  {
    field: 'actions',
    headerName: '',
    width: 120,
    renderCell: (params) => (
      <>
        <IconButton edge="end">
          <MdStarBorder />
        </IconButton>
        <IconButton edge="end">
          <CgGitFork />
        </IconButton>
      </>
    ),
  },
];

const GistList: React.FC<IGistProps> = ({ gists }) => {
    
      return (
        <DataGrid
          rows={gists} // Provide sliced data based on pagination state
          columns={columns}
          rowHeight={80}
          checkboxSelection
          getRowId={(row) => row.id}
          className='gists-listing'
        />
      );
};

export default GistList;
