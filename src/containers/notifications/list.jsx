import React from "react";
import { List, ListItem, Link } from 'framework7-react';
import crypto from 'crypto-js';
import InteractionMenu from "../interactions/menu"
import { dict } from "../../Dict";

const NotificationList = (props) => {
  if (props.notifications && props.notifications.length > 0) {
    function profileLink(profile){
      return(<Link href='/profiles/'>{profile.fullname}</Link>)
    }

    function colorClass(notification){
      if (!notification.seen){
        return 'bg-blonde'
      }
    }
    return (
      <List mediaList>
        {props.notifications.map((notification) =>
          <ListItem
            className={colorClass(notification)}
            key={crypto.lib.WordArray.random(32)}
            link={'/' + notification.target_type+ '/'+ notification.target_id}
            title={notification.content}
            subtitle={profileLink(notification.profile)}
          >
          <img slot="media" src={notification.profile.avatar} width="44" />
          </ListItem>
        )}
      </List>
    )
  } else {
    return (<ul></ul>)
  }
}
export default NotificationList;
