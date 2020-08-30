import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, BlockTitle } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const SettingForm = (props) => {
  console.log(props)
  return (
    <React.Fragment>
      <BlockTitle>{dict.setting}</BlockTitle>
      <List form>
        <ListInput
          label='Title'
          inputStyle={{direction: 'ltr'}}
          type="text"
          placeholder='...'
          defaultValue={props.title}
          onInput={(e) => {
            props.handleChange({ title: e.target.value })
          }}
        />
        <ListInput
          label="Schema"
          type="text"
          inputStyle={{direction: 'ltr'}}
          value={props.content}
          placeholder="JSON"
          onInput={(e) => {
            props.handleChange({ content: e.target.value })
          }}
        ></ListInput>
      </List>

      <Block strong>
        <Row tag="p">
          <Button className="col" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
    </React.Fragment>
  )
}
export default SettingForm;
