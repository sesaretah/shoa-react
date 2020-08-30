import React from "react";
import { List, ListItem, Toggle, Block, Row, Button, Chip, Col } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const SettingForm = (props) => {
  if (true) {
    function setting(item) {
      //console.log(props.notification_setting, item)
      if (props.notification_setting && props.notification_setting[item]) {
        return (true)
      } else {
        if (props.notification_setting && props.notification_setting[item] == false) {
          return (false)
        } else {
          return (false)
        }
      }
    }

    function blockList() {
      var chips = [
        <div>
          <a className='fs-11 ' href="#" id='user-blocklist'>
            <div className="item-title fs-11">
              <i className="va-minus-2 ml-5 fa fa-user-plus"></i>
              {dict.profiles}:
          </div>
          </a>
        </div>
      ]
      if (props.blockList) {
        props.blockList.map((profile) => {
          chips.push(<Chip text={profile.fullname} deleteable onClick={() => props.removeBlocked(profile.id)} />)
        }
        )
      }
      return chips
    }

    function able_to_post() {
      var result = []
      if (props.ability) {
        props.ability.map((ab) => {
          if (ab.title === 'new_post') {
            result.push(
              <React.Fragment>
                <tr>
                  <td className='fs-11'>{dict.add_comment_to_posts}</td>
                  <td><Toggle className='pd-5' checked={setting('add_comment_to_posts_email')} onChange={(e) => props.changeSetting(e, 'add_comment_to_posts_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_comment_to_posts_push')} onChange={(e) => props.changeSetting(e, 'add_comment_to_posts_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_comment_to_posts_sms')} onChange={(e) => props.changeSetting(e, 'add_comment_to_posts_sms')} /></td>
                </tr>
                <tr>
                  <td className='fs-11'>{dict.remove_comments_from_posts}</td>
                  <td><Toggle className='pd-5' checked={setting('remove_comment_from_posts_email')} onChange={(e) => props.changeSetting(e, 'remove_comment_from_posts_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_comment_from_posts_push')} onChange={(e) => props.changeSetting(e, 'remove_comment_from_posts_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_comment_from_posts_sms')} onChange={(e) => props.changeSetting(e, 'remove_comment_from_posts_sms')} /></td>
                </tr>
                <tr>
                  <td className='fs-11'>{dict.add_likes_to_posts}</td>
                  <td><Toggle className='pd-5' checked={setting('add_likes_to_posts_email')} onChange={(e) => props.changeSetting(e, 'add_likes_to_posts_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_likes_to_posts_push')} onChange={(e) => props.changeSetting(e, 'add_likes_to_posts_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_likes_to_posts_sms')} onChange={(e) => props.changeSetting(e, 'add_likes_to_posts_sms')} /></td>
                </tr>
                <tr>
                  <td className='fs-11'>{dict.remove_likes_from_posts}</td>
                  <td><Toggle className='pd-5' checked={setting('remove_likes_from_posts_email')} onChange={(e) => props.changeSetting(e, 'remove_likes_from_posts_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_likes_from_posts_push')} onChange={(e) => props.changeSetting(e, 'remove_likes_from_posts_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_likes_from_posts_sms')} onChange={(e) => props.changeSetting(e, 'remove_likes_from_posts_sms')} /></td>
                </tr>
                <tr>
                  <td className='fs-11'>{dict.add_bookmarks_to_posts}</td>
                  <td><Toggle className='pd-5' checked={setting('add_bookmarks_to_posts_email')} onChange={(e) => props.changeSetting(e, 'add_bookmarks_to_posts_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_bookmarks_to_posts_push')} onChange={(e) => props.changeSetting(e, 'add_bookmarks_to_posts_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_bookmarks_to_posts_sms')} onChange={(e) => props.changeSetting(e, 'add_bookmarks_to_posts_sms')} /></td>
                </tr>
                <tr>
                  <td className='fs-11'>{dict.remove_bookmarks_from_posts}</td>
                  <td><Toggle className='pd-5' checked={setting('remove_bookmarks_from_posts_email')} onChange={(e) => props.changeSetting(e, 'remove_bookmarks_from_posts_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_bookmarks_from_posts_push')} onChange={(e) => props.changeSetting(e, 'remove_bookmarks_from_posts_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_bookmarks_from_posts_sms')} onChange={(e) => props.changeSetting(e, 'remove_bookmarks_from_posts_sms')} /></td>
                </tr>

                <tr>
                  <td className='fs-11'>{dict.add_follows_to_posts}</td>
                  <td><Toggle className='pd-5' checked={setting('add_follows_to_posts_email')} onChange={(e) => props.changeSetting(e, 'add_follows_to_posts_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_follows_to_posts_push')} onChange={(e) => props.changeSetting(e, 'add_follows_to_posts_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_follows_to_posts_sms')} onChange={(e) => props.changeSetting(e, 'add_follows_to_posts_sms')} /></td>
                </tr>
                <tr>
                  <td className='fs-11'>{dict.remove_follows_from_posts}</td>
                  <td><Toggle className='pd-5' checked={setting('remove_follows_from_posts_email')} onChange={(e) => props.changeSetting(e, 'remove_follows_from_posts_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_follows_from_posts_push')} onChange={(e) => props.changeSetting(e, 'remove_follows_from_posts_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_follows_from_posts_sms')} onChange={(e) => props.changeSetting(e, 'remove_follows_from_posts_sms')} /></td>
                </tr>


                <tr>
                  <td className='fs-11'>{dict.add_shares_to_posts}</td>
                  <td><Toggle className='pd-5' checked={setting('add_shares_to_posts_email')} onChange={(e) => props.changeSetting(e, 'add_shares_to_posts_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_shares_to_posts_push')} onChange={(e) => props.changeSetting(e, 'add_shares_to_posts_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_shares_to_posts_sms')} onChange={(e) => props.changeSetting(e, 'add_shares_to_posts_sms')} /></td>
                </tr>
                <tr>
                  <td className='fs-11'>{dict.remove_shares_from_posts}</td>
                  <td><Toggle className='pd-5' checked={setting('remove_shares_from_posts_email')} onChange={(e) => props.changeSetting(e, 'remove_shares_from_posts_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_shares_from_posts_push')} onChange={(e) => props.changeSetting(e, 'remove_shares_from_posts_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_shares_from_posts_sms')} onChange={(e) => props.changeSetting(e, 'remove_shares_from_posts_sms')} /></td>
                </tr>
              </React.Fragment>
            )
          }
        })
      }
      return result
    }

    function able_to_channel() {
      var result = []
      if (props.ability) {
        props.ability.map((ab) => {
          if (ab.title === 'new_channel') {
            result.push(
              <React.Fragment>
                <tr>
                  <td className='fs-11'>{dict.add_likes_to_channels}</td>
                  <td><Toggle className='pd-5' checked={setting('add_likes_to_channels_email')} onChange={(e) => props.changeSetting(e, 'add_likes_to_channels_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_likes_to_channels_push')} onChange={(e) => props.changeSetting(e, 'add_likes_to_channels_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_likes_to_channels_sms')} onChange={(e) => props.changeSetting(e, 'add_likes_to_channels_sms')} /></td>
                </tr>
                <tr>
                  <td className='fs-11'>{dict.remove_likes_from_channels}</td>
                  <td><Toggle className='pd-5' checked={setting('remove_likes_from_channels_email')} onChange={(e) => props.changeSetting(e, 'remove_likes_from_channels_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_likes_from_channels_push')} onChange={(e) => props.changeSetting(e, 'remove_likes_from_channels_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_likes_from_channels_sms')} onChange={(e) => props.changeSetting(e, 'remove_likes_from_channels_sms')} /></td>
                </tr>
                <tr>
                  <td className='fs-11'>{dict.add_bookmarks_to_channels}</td>
                  <td><Toggle className='pd-5' checked={setting('add_bookmarks_to_channels_email')} onChange={(e) => props.changeSetting(e, 'add_bookmarks_to_channels_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_bookmarks_to_channels_push')} onChange={(e) => props.changeSetting(e, 'add_bookmarks_to_channels_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_bookmarks_to_channels_sms')} onChange={(e) => props.changeSetting(e, 'add_bookmarks_to_channels_sms')} /></td>
                </tr>
                <tr>
                  <td className='fs-11'>{dict.remove_bookmarks_from_channels}</td>
                  <td><Toggle className='pd-5' checked={setting('remove_bookmarks_from_channels_email')} onChange={(e) => props.changeSetting(e, 'remove_bookmarks_from_channels_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_bookmarks_from_channels_push')} onChange={(e) => props.changeSetting(e, 'remove_bookmarks_from_channels_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_bookmarks_from_channels_sms')} onChange={(e) => props.changeSetting(e, 'remove_bookmarks_from_channels_sms')} /></td>
                </tr>

                <tr>
                  <td className='fs-11'>{dict.add_follows_to_channels}</td>
                  <td><Toggle className='pd-5' checked={setting('add_follows_to_channels_email')} onChange={(e) => props.changeSetting(e, 'add_follows_to_channels_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_follows_to_channels_push')} onChange={(e) => props.changeSetting(e, 'add_follows_to_channels_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('add_follows_to_channels_sms')} onChange={(e) => props.changeSetting(e, 'add_follows_to_channels_sms')} /></td>
                </tr>
                <tr>
                  <td className='fs-11'>{dict.remove_follows_from_channels}</td>
                  <td><Toggle className='pd-5' checked={setting('remove_follows_from_channels_email')} onChange={(e) => props.changeSetting(e, 'remove_follows_from_channels_email')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_follows_from_channels_push')} onChange={(e) => props.changeSetting(e, 'remove_follows_from_channels_push')} /></td>
                  <td><Toggle className='pd-5' checked={setting('remove_follows_from_channels_sms')} onChange={(e) => props.changeSetting(e, 'remove_follows_from_channels_sms')} /></td>
                </tr>
              </React.Fragment>

            )
          }
        })
      }
      return result
    }

    return (
      <React.Fragment>

        <div className="data-table card">
          <table className='fs-11'>
            <thead>
              <tr>
                <td>{dict.notification_type}</td>
                <td>{dict.mail_notification}</td>
                <td>{dict.push_notification}</td>
                <td>{dict.sms}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='fs-11'>{dict.add_comment_to_followed_posts}</td>
                <td><Toggle className='pd-5' checked={setting('add_comment_to_followed_posts_email')} onChange={(e) => props.changeSetting(e, 'add_comment_to_followed_posts_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_comment_to_followed_posts_push')} onChange={(e) => props.changeSetting(e, 'add_comment_to_followed_posts_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_comment_to_followed_posts_sms')} onChange={(e) => props.changeSetting(e, 'add_comment_to_followed_posts_sms')} /></td>
              </tr>
              {able_to_post()}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {able_to_channel()}
              <tr>
                <td className='fs-11'>{dict.add_post_to_channels}</td>
                <td><Toggle className='pd-5' checked={setting('add_post_to_channels_email')} onChange={(e) => props.changeSetting(e, 'add_post_to_channels_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_post_to_channels_push')} onChange={(e) => props.changeSetting(e, 'add_post_to_channels_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_post_to_channels_sms')} onChange={(e) => props.changeSetting(e, 'add_post_to_channels_sms')} /></td>
              </tr>



            </tbody>
          </table>
        </div>



      </React.Fragment>
    )
  } else {
    return (null)
  }

}
export default SettingForm;
