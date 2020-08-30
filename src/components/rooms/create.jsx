import React, { Component } from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  ListInput,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block,
  Icon
} from 'framework7-react';
import { dict} from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import RoomForm from "../../containers/rooms/form"
import Framework7 from 'framework7/framework7.esm.bundle';

export default class RoomCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);

    this.state = {
      token: window.localStorage.getItem('token'),
      room: {},
      defaultRoom: true,
    }
  }


  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
  }

  submit(){
    var data = {title: this.state.title, default_room: this.state.defaultRoom}
    MyActions.setInstance('rooms', data, this.state.token);
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  setInstance(){
    const self = this;
    this.$f7router.navigate('/rooms/');
  }



  render() {
    const {room, defaultRoom} = this.state;
    return (
      <Page>
        <Navbar title={dict.room_form} backLink={dict.back} />
        <BlockTitle>{dict.room_form}</BlockTitle>
        <RoomForm room={room} defaultRoom={defaultRoom} submit={this.submit} editing={true} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
