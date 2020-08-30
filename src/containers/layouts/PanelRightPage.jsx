import React, { Component } from 'react';
import { Menu, MenuItem, MenuDropdown, MenuDropdownItem, Page, Navbar, Block, BlockTitle, List, ListItem, FabButton, FabButtons, Fab, Icon } from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import { thresholdScott } from 'd3';

export default class PanelRightPage extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.check_ability = this.check_ability.bind(this);


    this.state = {
      token: window.localStorage.getItem('token'),
      ability: null,
      profileId: null,
    }
  }

  logout() {
    this.setState({ token: null });
    window.localStorage.removeItem('token');
    window.location.replace('/')
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.getInstance);
  }

  componentDidMount() {
    if (this.state.token && this.state.token.length > 10) {
      MyActions.getInstance('users', 'role', this.state.token);
    }
  }

  getInstance() {
    var user = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (user && klass === 'UserRole') {
      this.setState({
        ability: user.the_ability,
        roles: user.the_roles,
        profileId: user.profile_id
      });
    }

  }

  check_ability(a, link, icon) {
    var result = []
    if (this.state.ability) {
      this.state.ability.map((ab) => {
        if (ab.title === a && ab.value) {
          result.push(
            <ListItem link={"/" + link + "/"} ignoreCache={true} key={'panel' + link} view="#main-view" panelClose>
              <i className={"va ml-5 fa fa-" + icon}></i>
              <span>{dict[link]}</span>
            </ListItem>
          )
        }
      })
    }
    return result
  }

  changeRole(role_id) {
    var data = {role_id: role_id}
    MyActions.setInstance('users/change_role', data, this.state.token);
  }

  profile() {
    if (this.state.profileId) {
      return (
        <ListItem link={"/profiles/" + this.state.profileId} view="#main-view" panelClose>
          <i className="va ml-5 fa fa-user-circle-o"></i>
          <span>{dict.profile}</span>
        </ListItem>
      )
    }
  }

  roles() {
    var options = []
    if (this.state.roles) {
      this.state.roles.map((role) => {
        if(role.current){
          options.push(<option value={role.id} key={'role' + role.id} selected >{role.title}</option>)
        } else {
          options.push(<option value={role.id} key={'role' + role.id} >{role.title}</option>)
        }
        
      }
      )
    }
    return options
  }

  logged_in(token) {
    if (token) {
      return (
        <React.Fragment>
          <BlockTitle> <i className="va ml-5 fa fa-tachometer"></i>{dict.dashboard}</BlockTitle>
          <List className='fs-13'>
            <ListItem link="/posts/" ignoreCache={false} reloadCurrent={false} view="#main-view" panelClose>
              <i className="va ml-5 fa fa-pencil"></i>
              <span>{dict.posts}</span>
            </ListItem>

            <ListItem link="/channels/" ignoreCache={false} reloadCurrent={false} data-transition="f7-cover" view="#main-view" panelClose>
              <i className="va ml-5 fa fa-bullhorn"></i>
              <span>{dict.channels}</span>
            </ListItem>

            <ListItem link="/notifications/" ignoreCache={false} reloadCurrent={false} view="#main-view" panelClose>
              <i className="va ml-5 fa fa-circle-o-notch"></i>
              <span>{dict.notifications}</span>
            </ListItem>

            <ListItem link="/bookmarks/" ignoreCache={false} reloadCurrent={false} view="#main-view" panelClose>
              <i className="va ml-5 fa fa-bookmark"></i>
              <span>{dict.bookmarks}</span>
            </ListItem>
          </List>

          <BlockTitle><i className="va ml-5 fa fa-cogs"></i>{dict.user_settings}</BlockTitle>
          <List>
            <ListItem link="/privacy_settings/" ignoreCache={true} view="#main-view" panelClose>
              <i className="va ml-5 fa fa-user-secret"></i>
              <span>{dict.privacy_settings}</span>
            </ListItem>
            <ListItem link="/notification_settings/" ignoreCache={true} view="#main-view" panelClose>
              <i className="va ml-5 fa fa-cog"></i>
              <span>{dict.notification_settings}</span>
            </ListItem>
            {this.profile()}

            <li className="">
              <a className="item-link panel-close smart-select smart-select-init" data-open-in="popover">
                <select name="superhero" onChange={(e) => { this.changeRole(e.target.value) }}>
                  {this.roles()}
                </select>
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">{dict.change_role}</div>
                  </div>
                </div>
              </a>
            </li>

            <ListItem view="#main-view" panelClose onClick={this.logout}>
              <i className="va ml-5 fa fa-power-off"></i>
              <span>{dict.logout}</span>
            </ListItem>
          </List>


          <BlockTitle> <i className="va ml-5 fa fa-cog"></i>{dict.settings}</BlockTitle>
          <List className='fs-13'>
            {this.check_ability('change_role', "roles", "shield")}
          </List>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <BlockTitle>{dict.user_settings}</BlockTitle>
          <List>
            <ListItem link="/login/" title={dict.login} view="#main-view" panelClose></ListItem>
          </List>
        </React.Fragment>
      )
    }
  }

  render() {
    const { token } = this.state;
    return (
      <Page >
        <Navbar title={dict.tavan} />
        {this.logged_in(token)}
      </Page>
    );
  }
}