import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Home from '@material-ui/icons/Home';
import Language from '@material-ui/icons/Language';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Settings from '@material-ui/icons/Settings';
import AssignmentIcon from '@material-ui/icons/Assignment';
import './styles.css';

export const mainListItems = (
  <div>
    <Link className="link" to='/'>
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="HOME" />
      </ListItem>
    </Link>
    <Link className="link" to='/atlas'>
      <ListItem button>
        <ListItemIcon>
          <Language />
        </ListItemIcon>
        <ListItemText primary="ATLAS TOPONÍMICO" />
      </ListItem>
    </Link>
    <Link className="link" to='/users'>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="USUÁRIOS" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="RELACIONAR DADOS" />
    </ListItem>
    <Link className="link" to='/posts'>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="POSTS" />
      </ListItem>
    </Link>
    <Link className="link" to='/settings'>
      <ListItem button>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="AJUSTES" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);