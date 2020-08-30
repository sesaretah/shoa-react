import React from "react";
import { List, BlockTitle, ListItem, Block, Row, Col, Button } from 'framework7-react';
import { stateToHTML } from "draft-js-export-html";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import { dict } from '../../Dict';
import InteractionMenu from "../interactions/menu"
import ShareMenu from "../shares/menu"
import CommentForm from "../comments/form"
import CommentList from "../comments/list"
import { post } from "jquery";


const PostShow = (props) => {
  if (props.post && props.post.draft) {
    console.log(props.post)
    const contentState = convertFromRaw(props.post.draft);
    const editorState = EditorState.createWithContent(contentState);
    function content() {
      if (props.post.content.length > 1) {
        return (
          <React.Fragment>
            <BlockTitle>{dict.content}</BlockTitle>
            <Editor editorState={editorState}
              toolbar={{ options: [] }}
              readOnly={true}
            />
          </React.Fragment>
        )
      }

    }

    function rated(i) {
      if (props.post.rating >= i) {
        return (<i class="fa fa-star" aria-hidden="true"></i>)
      } else {
        return (<i class="fa fa-star-o" aria-hidden="true"></i>)
      }
    }

    function rating() {
      return (
        <Block strong>
          <a onClick={() => props.rating(1)}>{rated(1)}</a>
          <a onClick={() => props.rating(2)}>{rated(2)}</a>
          <a onClick={() => props.rating(3)}>{rated(3)}</a>
          <a onClick={() => props.rating(4)}>{rated(4)}</a>
          <a onClick={() => props.rating(5)}>{rated(5)}</a>
          <span className='fs-11 mr-2'>({props.post.rated})</span>
        </Block>
      )
    }

    function deleteable() {
      if (props.deletable) {
        return (
          <Col width="25" tabletWidth='10' className='ml-5'>
            <Button fill color="red" onClick={() => props.deletePostConfirm()}><i class="fa fa-trash-o" aria-hidden="true"></i></Button>
          </Col>)
      }
    }
    return (
      <React.Fragment>
        <Block>
          <Row>
            <Col width='50' tabletWidth='60'></Col>
            {deleteable()}
            <Col width="25" tabletWidth='15' className='ml-5'>
              <Button tooltip={dict.share} fill><ShareMenu model={props.post} submit={props.submit} channels={props.channels} klass='Post' sheetOpened={props.sheetOpened} handleChange={props.handleChange} klass='Channel' interaction={props.interaction} /></Button>
            </Col>
            <Col width="25" tabletWidth='15'>
              <Button  tooltip={dict.social_acts} fill><InteractionMenu model={props.post} klass='Post' interaction={props.interaction} /></Button>
            </Col>
          </Row>
        </Block>
        <BlockTitle>{dict.title}</BlockTitle>
        <List simple-list>
          <ListItem>{props.post.title}</ListItem>
        </List>

        {content()}
        {rating()}

        <CommentForm
          model={props.post} submit={props.submitComment}
          handleChange={props.handleChange} replyTo={props.replyTo}
          comments={props.comments} removeReply={props.removeReply}
          rnd={props.rnd}
        />
        <CommentList
          comments={props.comments} deleteCommentConfirm={props.deleteCommentConfirm}
          replyToComment={props.replyToComment}
        />
      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default PostShow;
