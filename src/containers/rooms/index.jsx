import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import RoomList from "./list"
import { dict} from '../../Dict';

const RoomIndex = (props) => {
  function fab(a) {
    console.log(props.ability)
    var result = []
    if (props.ability) {
      props.ability.map((ab) => {
        if (ab.title === a && ab.value) {
          result.push(
            <Fab href="/rooms/new" target="#main-view" position="left-bottom" slot="fixed" color="deeporange">
            <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
            <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
          </Fab>
          )
        }
      })
    }
    return result
  }
  return(
    <Page>
      <Navbar title={dict.rooms} backLink={dict.back} >
      </Navbar>
      <BlockTitle>{dict.list}</BlockTitle>
      {fab('new_room')}
      <RoomList rooms={props.rooms}/>
    </Page>
  )
}
export default RoomIndex;
