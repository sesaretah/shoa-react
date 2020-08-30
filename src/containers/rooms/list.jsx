import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const RoomList = (props) => {

  if (props.rooms) {
    return (
      <List mediaList>
        {props.rooms.map((room) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/rooms/" + room.id}
            ignoreCache={true}
            title={room.title}
            after=""
            subtitle=""
            text=""
            ></ListItem>
        )}
      </List>
    )} else {
      return (<ul></ul>)
    }
  }
  export default RoomList;
