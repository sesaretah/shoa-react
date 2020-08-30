import React from "react";
import { Page, Navbar, Subnavbar, Searchbar, BlockTitle, Link, Fab, Icon, Toolbar, Tabs, Tab, Block } from 'framework7-react';
import BookmarkList from "./list"
import { dict } from '../../Dict';

const BookmarkIndex = (props) => {
  return (
    <Page>
      <Navbar title={dict.bookmarks} >
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
      </Navbar>

      <BookmarkList bookmarks={props.bookmarks} loadMore={props.loadMore} />

    </Page>
  )
}
export default BookmarkIndex;
