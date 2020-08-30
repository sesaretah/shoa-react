import React, { Component } from 'react';
import { Menu, MenuItem, MenuDropdown, MenuDropdownItem, Page, Navbar, Block, BlockTitle, List, ListItem, FabButton, FabButtons, Fab, Icon } from 'framework7-react';
import { dict } from '../../Dict';
export default class PanelRightPage extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.state = {
      token: window.localStorage.getItem('token'),
    }
  }

  logout(){
    this.setState({token: null});
    window.localStorage.removeItem('token');
    window.location.reload()
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

  logged_in(token) {
    if (token) {
      return (
        <React.Fragment>
          <BlockTitle>{dict.user_settings}</BlockTitle>
          <List>
            <ListItem view="#main-view" panelClose onClick={this.logout}>
            <i className="va ml-5 fa fa-power-off"></i>
              <span>{dict.logout}</span>
            </ListItem>
          </List>
          <BlockTitle> <i className="va ml-5 fa fa-users"></i>{dict.social}</BlockTitle>
          <List>
            <ListItem link="/posts/" ignoreCache={false} reloadCurrent={false} view="#main-view" panelClose>
              <i className="va ml-5 fa fa-pencil"></i>
              <span>{dict.posts}</span>
            </ListItem>
            
            <ListItem link="/channels/" ignoreCache={false} reloadCurrent={false} view="#main-view" panelClose>
            <i className="va ml-5 fa fa-bullhorn"></i>
              <span>{dict.channels}</span>
            </ListItem>
            
            <ListItem link="/profiles/" ignoreCache={false} reloadCurrent={false} view="#main-view" panelClose>
              <i className="va ml-5 fa fa-user-circle-o"></i>
              <span>{dict.profiles}</span>
            </ListItem>

            <ListItem link="/notifications/" ignoreCache={false} reloadCurrent={false} view="#main-view" panelClose>
              <i className="va ml-5 fa fa-circle-o-notch"></i>
              <span>{dict.notifications}</span>
            </ListItem>

            <ListItem link="/rooms/" ignoreCache={false} reloadCurrent={false} view="#main-view" panelClose>
              <i className="va ml-5 fa fa-address-card-o"></i>
              <span>{dict.rooms}</span>
            </ListItem>

            </List>
            <BlockTitle> <i className="va ml-5 fa fa-cogs"></i>{dict.settings}</BlockTitle>
            <List>
            <ListItem link="/settings/" ignoreCache={true} view="#main-view" panelClose>
            <i className="va ml-5 fa fa-cog"></i>
              <span>{dict.global_settings}</span>
            </ListItem>

            <ListItem link="/notification_settings/" ignoreCache={true} view="#main-view" panelClose>
            <i className="va ml-5 fa fa-cog"></i>
              <span>{dict.notification_settings}</span>
            </ListItem>
            <ListItem link="/roles/" ignoreCache={true} view="#main-view" panelClose>
            <i className="va ml-5 fa fa-shield"></i>
              <span>{dict.roles}</span>
            </ListItem>
            <ListItem link="/metas/" ignoreCache={true} view="#main-view" panelClose>
            <i className="va ml-5 fa fa-th"></i>
              <span>{dict.metas}</span>
            </ListItem>
            <ListItem link="/privacy_settings/" ignoreCache={true} view="#main-view" panelClose>
            <i className="va ml-5 fa fa-vcard"></i>
              <span>{dict.privacy_settings}</span>
            </ListItem>
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
        <Navbar ><span className='jc-center white'><i className="va ml-5 fa fa-umbrella"></i>{dict.Shoa}</span></Navbar>
        {this.logged_in(token)}
      </Page>
    );
  }
}