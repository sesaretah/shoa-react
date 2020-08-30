import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, BlockTitle, Link } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const RoomForm = (props) => {
  if (props.defaultRoom) {
    var isPrivateRoom = true;
  } else {
    var isPrivateRoom = false
  }

  return (
    <React.Fragment>
      <BlockTitle>{dict.room}</BlockTitle>
      <List >
        <ListInput
          label={dict.title}
          key='room-title'
          type="text"
          placeholder='...'
          defaultValue={props.room.title}
          onInput={(e) => {
            props.handleChange({ title: e.target.value })
          }}
        />
        <ListInput
          label={dict.details}
          type="textarea"
          placeholder={dict.write_appropriate_description}
          value={props.details}
          onInput={(e) => {
            props.handleChange({ details: e.target.value })
          }}
        />

        <ListItem radio value={false} checked={!isPrivateRoom} name="privateRoom" title={dict.NonPrivate}
          onChange={(e) => {
            console.log(e)
            props.handleChange({ privateRoom: JSON.parse(e.target.value) })
          }}>
        </ListItem>
        <ListItem radio value={true} checked={isPrivateRoom} name="privateRoom" title={dict.Private}
          onChange={(e) => {
            console.log(e)
            props.handleChange({ privateRoom: JSON.parse(e.target.value) });
          }}>
        </ListItem>
      </List>

      <Block strong>
        <Row tag="p">
          <Link className="btn-notice"></Link>
          <Button className="col btn" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
    </React.Fragment>
  )
}
export default RoomForm;
