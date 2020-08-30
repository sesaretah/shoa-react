import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import ChannelIndex from "../../containers/channels/index"
import * as MyActions from "../../actions/MyActions";
import { dict} from '../../Dict';
import Framework7 from 'framework7/framework7.esm.bundle';
import {loggedIn} from "../../components/users/loggedIn.js"


export default class Channel extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.loggedIn = loggedIn.bind(this);
    this.interaction = this.interaction.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.search = this.search.bind(this);
    this.loadMore = this.loadMore.bind(this);

    this.state = {
      token: window.localStorage.getItem('token'),
      channels: [],
      query: null,
      page: 1,
      ability: null,
      profileId: null,
      allowInfinite: true,
      showPreloader: true,
    }
  }
  componentWillMount() {
    ModelStore.on("got_list", this.getList);
    ModelStore.on("set_instance", this.setInstance);
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_list", this.getList);
    ModelStore.removeListener("set_instance", this.setInstance);
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount(){
    this.loggedIn();
    this.loadData();
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

  loadData(){
    MyActions.getList('channels', this.state.page, {} , this.state.token);
    MyActions.getInstance('users', 'role', this.state.token);
  }

  search(obj) {
    this.setState({ channels: [], page: 1 });
    this.setState(obj, () => {
      MyActions.getList('channels/search', this.state.page, { q: this.state.query }, this.state.token);
    });
  }


  setInstance(){
    var channel = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if(channel && klass === 'Channel') {
      this.setState({channels: this.state.channels.map(el => (el.id === channel.id ? Object.assign({}, el, channel) : el))});
    }
  }



  loadMore() {
    if (this.state.query && this.state.query.length > 0) {
      this.setState({ page: this.state.page + 1 }, () => {
        MyActions.getList('channels/search', this.state.page, {q: this.state.query }, this.state.token);
      });
    } else {
      this.setState({ page: this.state.page + 1 }, () => {
        MyActions.getList('channels', this.state.page, {}, this.state.token);
      });
      this.setState({ showPreloader: false });
    }

  }

  getList() {
    var channels = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (channels.length > 0 && klass === 'ChannelSearch') {
      this.setState({
        channels: channels,
      });
    }
    if (channels.length > 0 && klass === 'Channel') {
      this.setState({
        channels: this.state.channels.concat(channels),
      });
    }
    this.setState({ showPreloader: true });
  }

  interaction(interaction_type, interactionable_id, interactionable_type, source_type=null, source_id=null){
    var data = {interaction_type: interaction_type, interactionable_id: interactionable_id, interactionable_type: interactionable_type, source_type: source_type, source_id: source_id}
    MyActions.setInstance('interactions', data, this.state.token);
  }

  render() {
    const {channels, ability, profileId, showPreloader} = this.state;
    return(
      <ChannelIndex 
        interaction={this.interaction} search={this.search} 
        loadMore={this.loadMore} channels={channels}
        ability={ability} showPreloader={showPreloader}
        />)
  }
}
