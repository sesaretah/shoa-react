import React, { Component } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
} from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import NotificationSettingForm from "../../containers/notification_settings/form"
import Framework7 from 'framework7/framework7.esm.bundle';
import { conf } from '../../conf';

export default class SettingCreate extends Component {
  constructor() {
    super();

    this.getInstance = this.getInstance.bind(this);
    this.changeSetting = this.changeSetting.bind(this);
    this.loadBlockList = this.loadBlockList.bind(this);
    this.removeBlocked = this.removeBlocked.bind(this);
    


    this.state = {
      token: window.localStorage.getItem('token'),
      setting: {},
      title: null,
      id: null,
      setting: null,
      notification_setting: [],
      blockList: [],
      ability: null,
      profileId: null,
    }
  }


  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    MyActions.getInstance('notification_settings', 1, this.state.token);
    MyActions.getInstance('users', 'role', this.state.token);
  }

  pageAfterIn() {
    this.loadBlockList();
  }


  loadBlockList() {
    const self = this;
    const app = self.$f7;
    app.autocomplete.create({
      openIn: 'popup', //open in page
      openerEl: '#user-blocklist', //link that opens autocomplete
      multiple: true, //allow multiple values
      valueProperty: 'id', //object's "value" property name
      textProperty: 'fullname', //object's "text" property name
      searchbarDisableText: dict.cancel,
      popupCloseLinkText: dict.close,
      notFoundText: dict.not_found,
      limit: 50,
      searchbarPlaceholder: dict.search,
      //preloader: true, //enable preloader
      source: function (query, render) {
        var autocomplete = this;
        var results = [];
        if (query.length === 0) {
          render(results);
          return;
        }
        // Show Preloader
       // autocomplete.preloaderShow();
        // Do Ajax request to Autocomplete data
        app.request({
          url: conf.server + '/profiles/search',
          method: 'GET',
          dataType: 'json',
          //send "query" to server. Useful in case you generate response dynamically
          data: {
            q: query
          },
          success: function (item) {
            // Find matched items
            for (var i = 0; i < item.data.length; i++) {
               results.push(item.data[i]);
            }
            // Hide Preoloader
            //autocomplete.preloaderHide();
            // Render items by passing array with result items
            render(results);
          }
        });
      },
      on: {
        change: function (value) {
          if (value && value[value.length - 1]) {
            self.setState({ blockList: self.state.blockList.concat({ fullname: value[value.length - 1].fullname, id: value[value.length - 1].id }) })
            var data = {profile_id: value[value.length - 1].id }
            MyActions.setInstance('notification_settings/add_block', data, self.state.token)
          }
        },
      },
    });
  }





  getInstance() {
    var model = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (model && klass === 'NotificationSetting') {
      this.setState({
        title: model.title,
        id: model.id,
        notification_setting: model.notification_setting
      });
    }
    if (model && klass === 'UserRole') {
      this.setState({
        ability: model.the_ability,
        roles: model.the_roles,
        profileId: model.profile_id
      });
    }
    
  }

  changeSetting(e, item) {
    var data = { item: item }
    if (e.target.checked) {
      this.setState(prevState => {
        let notification_setting = Object.assign({}, prevState.notification_setting);
        notification_setting[item] = true;
        return { notification_setting };
      })
      MyActions.setInstance('notification_settings/add', data, this.state.token)
    } else {
      this.setState(prevState => {
        let notification_setting = Object.assign({}, prevState.notification_setting);
        notification_setting[item] = false;
        return { notification_setting };
      })
      MyActions.setInstance('notification_settings/remove', data, this.state.token);
    }
  }

  removeBlocked(id){
    this.setState({
      blockList: this.state.blockList.filter(function (profile) {
        return profile.id !== id
      })
    });
    var data = {profile_id: id }
    MyActions.setInstance('notification_settings/remove_block', data, this.state.token)
  }




  render() {
    const { notification_setting, title, blockList, ability } = this.state;
    return (
      <Page onPageAfterIn={this.pageAfterIn.bind(this)}>
        <Navbar title={dict.work_form} backLink={dict.back} />
        <BlockTitle>{dict.work_form}</BlockTitle>
        <NotificationSettingForm
          notification_setting={notification_setting} ability={ability}
          title={title} changeSetting={this.changeSetting} blockList={blockList}
          submit={this.submit} editing={true} handleChange={this.handleChangeValue} 
          removeBlocked={this.removeBlocked}
          />
      </Page>
    );
  }
}
