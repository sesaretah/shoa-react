import React from "react";
import { List, ListItem, Link} from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/fa';

const SimpleList = (props) => {
  if(props.profiles){
    return (
      <List>
        {props.profiles.map((profile) =>
          <ListItem
          title={profile.fullname}
          subtitle="..."
          link={'/profiles/'+profile.id}>
          <img slot="media" src={profile.avatar} width="25" />
          </ListItem>
        )}
      </List>
    )
  } else {
    return (<ul></ul>)
  }
}
export default SimpleList;
