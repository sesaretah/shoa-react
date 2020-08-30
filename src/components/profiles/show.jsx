import React, { Component } from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  ListInput,
  Link,
  Tabs,
  Toolbar,
  Tab,
  Range,
  Block,
  Icon, Fab
} from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import ProfileShow from "../../containers/profiles/show"

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.addTag = this.addTag.bind(this);
    this.interaction = this.interaction.bind(this);
    
    this.state = {
      token: window.localStorage.getItem('token'),
      profile: null,
      id: null,
      actuals: null,
      metas: null,
      channels: null,
      editable: false
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount() {
    MyActions.getInstance('profiles', this.$f7route.params['profileId'], this.state.token);
  }

  getInstance() {
    var profile = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (profile && klass === 'Profile') {
      this.setState({
        profile: profile,
        id: profile.id,
        actuals: profile.actuals,
        metas: profile.metas,
        channels: profile.channels,
        editable: profile.editable,
      });
    }
  }

  fab() {
    if (this.state.profile && this.state.editable) {
      return (
        <Fab href={"/profiles/" + this.state.profile.id + "/edit"} target="#main-view" position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  addTag(){
    console.log('hey');
  }

  interaction(interaction_type, interactionable_id, interactionable_type, source_type = null, source_id = null) {
    var data = { interaction_type: interaction_type, interactionable_id: interactionable_id, interactionable_type: interactionable_type, source_type: source_type, source_id: source_id }
    MyActions.setInstance('interactions', data, this.state.token);
  }

  render() {
    const { profile, actuals, metas, channels, editable } = this.state;
    return (
      <Page>
        <Navbar title={dict.profiles} backLinkForce={true} backLink={dict.back} />
        <Toolbar tabbar bottom>
          <Link tabLink="#tab-1" tabLinkActive><i className="va ml-5 fa fa-user-circle"></i></Link>
          <Link tabLink="#tab-2"><i className="va ml-5 fa fa-bar-chart"></i></Link>
          <Link tabLink="#tab-3"><i className="va ml-5 fa fa-list"></i></Link>
        </Toolbar>
        {this.fab()}
        <ProfileShow 
          profile={profile} actuals={actuals} channels={channels} 
          metas={metas} addTag={this.addTag} interaction={this.interaction}
          editable={editable}
          />

      </Page>
    );
  }
}
