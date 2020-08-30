import React from "react"
import { Page, Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import FriendshipIndex from "../../containers/friendships/index"
import * as MyActions from "../../actions/MyActions";
import { loggedIn } from "../users/loggedIn.js"


export default class Friendship extends React.Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.loggedIn = loggedIn.bind(this);


    this.state = {
      token: window.localStorage.getItem('token'),
      friendship: null,
      query: null,
      page: 1
    }
  }
  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount() {
    this.loggedIn();
    this.loadData();
  }

  loadData() {
    MyActions.getInstance('friendships', this.$f7route.params['sourceId'], this.state.token);
  }


  getInstance() {
    var friendship = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (friendship && klass === 'Friendship') {
      this.setState({
        friendship: friendship,
        id: friendship.id,
      });
    }
    console.log(friendship, klass)
  }



  render() {
    const { friendship } = this.state;
    return (<FriendshipIndex  friendship={friendship}  />)
  }
}
