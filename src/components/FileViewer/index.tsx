import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const classes = {
  root: {
    padding: '2px',
    overflow: 'auto',
    // backgroundColor: theme.palette.background.paper,
    position: 'relative',
  },
  lineNumber: {
    // Position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    padding: '2px',
    // color: theme.palette.text.secondary,
    textAlign: 'right',
    userSelect: 'none',
  },
  codeBlock: {
    marginLeft: '40px', // Adjust according to your line number width
  },
};

const FileViewer = ({ fileData }) => {

  // Split file data into lines
  const lines = fileData.split('\n');

  return (
    <Paper sx={classes.root} variant="outlined">
      <div >
      {/* style={{...classes.lineNumber}} */}
        {lines.map((_, index) => (
          <div key={index}>{index + 1}</div>
        ))}
      </div>
      <Typography sx={classes.codeBlock}>
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </Typography>
    </Paper>
  );
};

export default FileViewer;
