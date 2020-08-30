import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const SettingList = (props) => {

  if (props.settings) {
    return (
      <List mediaList>
        {props.settings.map((setting) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/settings/" + setting.id}
            ignoreCache={true}
            title={setting.title}
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
  export default SettingList;
