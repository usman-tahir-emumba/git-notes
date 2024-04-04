import React from 'react';
import { Grid } from '@mui/material';

import Gist from './Gist.tsx';
import {IGistProps} from '../../interfaces/Gist.ts';



const GistGrid: React.FC<IGistProps> = ({ gists }) => {
  return (
    <Grid container spacing={5}>
      {gists.map((gist) => (
        <Grid item xs={12} md={6} lg={4} key={gist.id}>
          <Gist {...gist} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GistGrid;
