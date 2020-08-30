import React, { Component } from 'react';
import {
  Page,
  Navbar
} from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import PrivacyIndex from "../../containers/privacy/index"

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.setInstance = this.setInstance.bind(this);
    
    this.state = {
      token: window.localStorage.getItem('token'),
      profilePrivacy: null,
      privacySettings: null,
      fields: [],

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

  componentDidMount() {
    MyActions.getInstance('privacy', 1, this.state.token);
  }

  getInstance() {
    var profilePrivacy = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (profilePrivacy && klass === 'Privacy') {
      this.setState({
        profilePrivacy: profilePrivacy,
        privacySettings: profilePrivacy.privacy_settings,
        fields : profilePrivacy.privacy_settings
      });
    }
  }

  setInstance(){
    const self = this;
    self.$f7.dialog.alert(dict.completed_successfully, dict.message);
  }


  submit() {
    var data = { id: 1, privacy: this.state.fields}
    MyActions.setInstance('privacy', data, this.state.token);
  }



  handleChangeValue(key, value) {
    var fields = this.state.fields
    if (fields.length > 0) {
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].title && fields[i].title == key) {
          let newState = Object.assign({}, this.state);
          newState.fields[i] = { title: key, value: value }
          this.setState(newState);
        } 
      }
    } else {
      this.setState({ fields: this.state.fields.concat({ title: key, value: value }) });
    }
  }

  render() {
    const { profilePrivacy, privacySettings } = this.state;
    return (
      <Page>
        <Navbar title={dict.privacy_settings} backLink={dict.back} />
        <PrivacyIndex profilePrivacy={profilePrivacy} privacySettings={privacySettings} handleChangeValue={this.handleChangeValue} submit={this.submit}/>
      </Page>
    );
  }
}
