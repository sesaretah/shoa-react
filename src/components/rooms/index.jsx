import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import RoomIndex from "../../containers/rooms/index"
import * as MyActions from "../../actions/MyActions";
import { dict} from '../../Dict';
import Framework7 from 'framework7/framework7.esm.bundle';


export default class Layout extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.getInstance = this.getInstance.bind(this);

    this.state = {
      token: window.localStorage.getItem('token'),
      rooms: null,
      ability: null,
      profileId: null
    }
  }
  componentWillMount() {
    ModelStore.on("got_list", this.getList);
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_list", this.getList);
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    MyActions.getList('rooms', this.state.page, {}, this.state.token);
  }

  getList() {
    var rooms = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (rooms && klass === 'Room'){
      this.setState({
        rooms: rooms,
      });
    }
  }


  getInstance() {
    var user = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (user && klass === 'UserRole') {
      this.setState({
        ability: user.the_ability,
        profileId: user.profile_id
      });
    }
  }

  render() {
    const {rooms, ability} = this.state;
    return(<RoomIndex rooms={rooms} ability={ability}/>)
  }
}
