import React from "react";
import { Page, Navbar, Searchbar, Subnavbar, Link, BlockTitle, Fab, Icon, Tabs, Tab, Block, Toolbar} from 'framework7-react';
import ChannelList from "./list"
import { dict } from '../../Dict';

const ChannelIndex = (props) => {
  function fab(a) {
    var result = []
    if (props.ability) {
      props.ability.map((ab) => {
        if (ab.title === a && ab.value) {
          result.push(
            <Fab href="/channels/new" target="#main-view" position="left-bottom" slot="fixed" color="deeporange">
            <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
            <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
          </Fab>
          )
        }
      })
    }
    return result
  }
  return (
    <Page      
    infinite={true}
    infiniteDistance={10}
    infinitePreloader={props.showPreloader}
    onInfinite={props.loadMore}>
      <Navbar title={dict.channels} >
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
        <Subnavbar inner={false}>
          <Searchbar
            disableButtonText={dict.cancel}
            placeholder={dict.search}
            onChange={(e) => {
              props.search({ query: e.target.value })
            }}
          ></Searchbar>
        </Subnavbar>
      </Navbar>
      <Toolbar tabbar bottom>
        <Link tabLink="#tab-1" tabLinkActive><i className="va ml-5 fa fa-link"></i></Link>
        <Link tabLink="#tab-2"><i className="va ml-5 fa fa-plug"></i></Link>
        <Link tabLink="#tab-3"><i className="va ml-5 fa fa-user-o"></i></Link>
      </Toolbar>
      <BlockTitle></BlockTitle>
      {fab('new_channel')}
      <Tabs swipeable>
        <Tab id="tab-1" className="page-content" tabActive>
          <Block>
            <ChannelList channels={props.channels} interaction={props.interaction} loadMore={props.loadMore} />
          </Block>
        </Tab>

        <Tab id="tab-2" className="page-content" >
          <Block>
            <ChannelList channels={props.channels} interaction={props.interaction} loadMore={props.loadMore} />
          </Block>
        </Tab>

        <Tab id="tab-3" className="page-content" >
          <Block>
            <ChannelList channels={props.channels} interaction={props.interaction} loadMore={props.loadMore} />
          </Block>
        </Tab>
      </Tabs>
    </Page>
  )
}
export default ChannelIndex;
