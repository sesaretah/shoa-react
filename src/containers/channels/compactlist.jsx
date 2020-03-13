import React from "react";
import { Card, List, ListItem, CardContent, CardHeader} from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from '../../Dict';

const ChannelCompactList = (props) => {
  if (props.channels && props.channels.length > 0) {
    console.log(props.channels)
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            {dict.channels}
          </CardHeader>
          <CardContent>
          <List>
            {props.channels.map((channel) =>
              <ListItem
                link={"/channels/"+channel.id}
                title={channel.title.substring(0, 30)}
              ></ListItem>
            )}
          </List>
          </CardContent>
        </Card>
      </React.Fragment>

    )
  } else {
    return (<ul></ul>)
  }
}
export default ChannelCompactList;
