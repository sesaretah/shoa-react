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
  Icon, Fab
} from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import SettingShow from "../../containers/settings/show"

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.getList = this.getList.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.removeSetting = this.removeSetting.bind(this);
    this.addAbility = this.addAbility.bind(this);
    this.removeAbility = this.removeAbility.bind(this);

    

    this.state = {
      token: window.localStorage.getItem('token'),
      setting: null,
      id: null,
      users: null,
      assignedUsers: null,
      user_id: null,
      abilityTitle: '',
      abilityValue: true,
      ability: null,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.getInstance);
    ModelStore.on("got_list", this.getList);
    ModelStore.on("deleted_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.getInstance);
    ModelStore.removeListener("got_list", this.getList);
    ModelStore.removeListener("deleted_instance", this.getInstance);
  }

  componentDidMount() {
    MyActions.getInstance('settings', this.$f7route.params['settingId'], this.state.token);
    MyActions.getList('users', this.state.page, {}, this.state.token);
  }

  getInstance() {
    var setting = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (setting && klass === 'Setting') {
      this.setState({
        setting: setting,
        id: setting.id,
        assignedUsers: setting.users,
        ability: setting.ability
      });
    }
  }

  getList() {
    var users = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (users && klass === 'User') {
      this.setState({
        users: users,
      });
    }
  }

  submit() {
    var data = { setting_id: this.state.id, user_id: this.state.user_id }
    MyActions.setInstance('users/assignments', data, this.state.token);
  }

  addAbility() {
    var data = { id: this.state.id, ability_title: this.state.abilityTitle, ability_value: this.state.abilityValue}
    MyActions.setInstance('settings/abilities', data, this.state.token);
  }

  handleChangeValue(obj) {
    this.setState(obj);
  }

  fab() {
    if (this.state.setting) {
      return (
        <Fab href={"/settings/" + this.state.setting.id + "/edit"} target="#main-view" position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  removeSetting(user_id) {
    MyActions.removeInstance('users/assignments', { user_id: user_id, setting_id: this.state.id }, this.state.token);
  }

  removeAbility(title){
    MyActions.removeInstance('settings/abilities', { id: this.state.id, title: title }, this.state.token);
  }

  render() {
    const { setting, users, assignedUsers, ability } = this.state;
    return (
      <Page>
        <Navbar title={dict.settings} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <SettingShow setting={setting} users={users} ability={ability} removeAbility={this.removeAbility} assignedUsers={assignedUsers} addAbility={this.addAbility} removeSetting={this.removeSetting} submit={this.submit} handleChange={this.handleChangeValue} />
      </Page>
    );
  }
}
