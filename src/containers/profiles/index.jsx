import React from "react";
import { Page, Navbar, Searchbar, BlockTitle, Subnavbar, Fab, Icon, Link } from 'framework7-react';
import ProfileList from "./list"
import { dict } from '../../Dict';

const ProfileIndex = (props) => {
  return (
    <Page>
      <Navbar title={dict.profiles} >
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
      
      <ProfileList profiles={props.profiles} interaction={props.interaction} />

    </Page>
  )
}
export default ProfileIndex;
