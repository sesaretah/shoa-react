import React from "react";
import { Page, Navbar, Searchbar, BlockTitle, NavRight, Fab, Icon, Link } from 'framework7-react'; import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/fa';
import SimpleList from "../profiles/simpleList"

const FriendshipIndex = (props) => {
    if (props.friendship) {
        return (
            <Page >
                <Navbar title={dict.profiles} backLink={dict.back}>
                    <Link panelOpen="right">
                        <Icon f7="bars"></Icon>
                    </Link>

                </Navbar>
                <BlockTitle></BlockTitle>
                <SimpleList profiles={props.friendship.followees} />
            </Page>
        )
    } else {
        return (null)
    }
}
export default FriendshipIndex;
