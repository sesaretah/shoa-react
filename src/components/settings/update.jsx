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
import SettingForm from "../../containers/settings/form"
import Framework7 from 'framework7/framework7.esm.bundle';

export default class SettingCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.getInstance = this.getInstance.bind(this);

    
    this.state = {
      token: window.localStorage.getItem('token'),
      title: '',
      id: null,
      content: '',
    }
  }


  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount() {
    MyActions.getInstance('settings', this.$f7route.params['settingId'], this.state.token);
  }


  getInstance() {
    var setting = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (setting && klass === 'Setting') {
      this.setState({
        title: setting.title,
        id: setting.id,
        content: setting.content
      });
    }
  }

  submit(){
    var data = {id: this.state.id, title: this.state.title, content: this.state.content}
    MyActions.updateInstance('settings', data, this.state.token);
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  setInstance(){
    const self = this;
    this.$f7router.navigate('/settings/');
  }



  render() {
    const {title, content} = this.state;
    return (
      <Page>
        <Navbar title={dict.setting_form} backLink={dict.back} />
        <BlockTitle>{dict.setting_form}</BlockTitle>
        <SettingForm title={title} content={content} submit={this.submit} editing={true} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
