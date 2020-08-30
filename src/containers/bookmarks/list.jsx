import React from "react";
import { List, ListItem, Link, Card, CardHeader, CardContent, CardFooter } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";

const BookmarkList = (props) => {
  console.log(props.bookmarks)
  if (props.bookmarks) {
    return (
      <List>
        {props.bookmarks.map((bookmark) =>
          <ListItem
            className={'fs-11 '}
            key={crypto.lib.WordArray.random(32)}
            link={'/' + bookmark.model + '/' + bookmark.id}
            title={bookmark.title}
          >
          </ListItem>
        )}
      </List>

    )
  } else {
    return (<ul></ul>)
  }
}
export default BookmarkList;
