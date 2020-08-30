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


export default class DocumentUpdate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);


    this.state = {
      token: window.localStorage.getItem('token'),
      room : {},
      defaultRoom: null,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.setInstance);

  }


  submit(){
    var data = {id:this.state.id, title: this.state.title, default_room: this.state.defaultRoom}
    MyActions.updateInstance('rooms', data,  this.state.token);
  }
  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    if (this.$f7route.params['roomId']) {
      MyActions.getInstance('rooms', this.$f7route.params['roomId'],  this.state.token);
    }
  }


  getInstance(){
    var room = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (room && klass === 'Room'){
      this.setState({
        title: room.title,
        id: room.id,
        room: room,
        defaultRoom: room.default_room
      });
    }
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
