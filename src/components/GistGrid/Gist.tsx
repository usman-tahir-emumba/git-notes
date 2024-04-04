import './style.scss';

import React from 'react';
import moment from 'moment';
import ViewGistFile from "react-gist";
import { Card, CardContent, CardHeader, Typography, Avatar, Divider } from '@mui/material';

import {IGist} from '../../interfaces/Gist.ts';


const Gist: React.FC<IGist> = ({ id, owner, description, url, created_at, keywords, files }) => {
    const firstFile:string = Object.keys(files).pop() || "";
    const shortFileName:string = firstFile.length > 15 ? `...${firstFile.slice(-15)}`: firstFile;
    const shortloginName:string = owner.login.length > 18 ? `...${owner.login.slice(-18)}`: owner.login;
     
    return (
      <Card className="custom-gist-item">
        <div className="file-viewer" style={{ }}>
          {files && 
            <ViewGistFile id={id} file={firstFile}/>
          }
        </div>
        <Divider />
        <CardHeader
          avatar={
            owner.avatar_url && <Avatar sx={{width: '50px', height: '50px'}} alt={owner.login} src={owner.avatar_url} />
          }
          title={<Typography noWrap={true} align='left' variant="body2" color="#0773ff">{shortloginName} / <b>{shortFileName}</b></Typography>}
          subheader={
          <Typography align='left' color="lightgray" lineHeight="13px">
            <span  style={{fontSize: 'small'}}>
              {created_at && `Created ${moment(created_at).fromNow()}`}
            </span><span  style={{fontSize: '9px', display: 'block'}}>Broadcast Server</span>
          </Typography>}
        />
        <CardContent>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            Created: {new Date(created_at).toLocaleString()}
          </Typography>
          {keywords && (
            <Typography variant="caption" color="text.secondary">
              Keywords: Webserver
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  };
  export default Gist;