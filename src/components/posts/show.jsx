import React, { Component } from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  ListInput,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block,
  Icon, Fab
} from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import PostShow from "../../containers/posts/show";
import crypto from 'crypto-js';
import { loggedIn } from "../../components/users/loggedIn.js"


export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.interaction = this.interaction.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.loggedIn = loggedIn.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.getList = this.getList.bind(this);
    this.submit = this.submit.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.deleteCommentConfirm = this.deleteCommentConfirm.bind(this);
    this.replyToComment = this.replyToComment.bind(this);  
    this.removeReply = this.removeReply.bind(this);      
    
    this.loadMore = this.loadMore.bind(this);
    this.rating = this.rating.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.deletePostConfirm = this.deletePostConfirm.bind(this);

    
    



    this.state = {
      post: null,
      id: null,
      page: 1,
      channels: null,
      selectedChannel: null,
      channelId: null,
      sheetOpened: false,
      commentContent: '',
      comments: null,
      token: window.localStorage.getItem('token'),
      rnd: crypto.lib.WordArray.random(32),
      replyTo: null,
      deletable: false

    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.setInstance);
    ModelStore.on("got_list", this.getList);
    ModelStore.on("deleted_instance", this.getInstance);

  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.setInstance);
    ModelStore.removeListener("got_list", this.getList);
    ModelStore.removeListener("deleted_instance", this.getInstance);
  }

  componentDidMount() {
    this.loggedIn();
    MyActions.getInstance('posts', this.$f7route.params['postId'], this.state.token);
    MyActions.getList('channels/my', this.state.page, {}, this.state.token);
  }

  getInstance() {
    var post = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (post && klass === 'Post') {
      this.setState({
        post: post,
        id: post.id,
        comments: post.comments,
        deletable: post.deletable
      });
    }
    if(klass ==='PostDelete') {
      this.$f7router.navigate('/posts/');
    }
  }

  getList() {
    var channels = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (channels && klass === 'Channel') {
      this.setState({
        channels: channels,
        channelId: channels[0].id
      });
    }
  }

  setInstance() {
    var post = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (post && klass === 'Post') {
      this.setState({
        post: post,
        comments: post.comments,
        page: 1,
      });
    }
    this.$$('#cm-form-'+this.state.rnd).val('');
  }

  loadMore() {
    this.setState({ page: this.state.page + 1 }, () => {
      MyActions.getInstance('posts', this.$f7route.params['postId'], this.state.token, this.state.page);
    });
  }

  fab() {
    if (this.state.post) {
      return (
        <Fab href={"/posts/" + this.state.post.id + "/edit"} target="#main-view" position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  handleChangeValue(obj) {
    this.setState(obj);
  }


  interaction(interaction_type, interactionable_id, interactionable_type, source_type = null, source_id = null) {
    var data = { interaction_type: interaction_type, interactionable_id: interactionable_id, interactionable_type: interactionable_type, source_type: source_type, source_id: source_id }
    MyActions.setInstance('interactions', data, this.state.token);
  }

  rating(value) {
    console.log('value: ' ,value)
    var data = { post_id: this.state.id, value: value }
    MyActions.setInstance('ratings', data, this.state.token);
  }

  submit() {
    var data = { post_id: this.state.id, channel_id: this.state.selectedChannel }
    MyActions.setInstance('shares', data, this.state.token);
    const self = this;
    self.$f7.sheet.close('.demo-sheet')
  }


  submitComment() {
    var data = {post_id: this.state.id, content: this.state.commentContent, reply_id: this.state.replyTo  }
    MyActions.setInstance('comments', data, this.state.token);
  }


  deleteCommentConfirm(id){
    const self = this;
    const app = self.$f7;
    app.dialog.confirm(dict.are_you_sure, dict.alert, () => self.deleteComment(id))
  }

  deleteComment(id) {
    var data = { id: id }
    MyActions.removeInstance('comments', data, this.state.token, this.state.page);
  }

  replyToComment(id) {
    this.setState({ replyTo: id })
    this.$$('#cm-form-'+this.state.rnd).focus()
  }

  removeReply() {
    this.setState({ replyTo: null })
  }

  deletePost() {
    var data = { id: this.state.id }
    MyActions.removeInstance('posts', data, this.state.token, this.state.page);
  }

  deletePostConfirm(){
    const self = this;
    const app = self.$f7;
    app.dialog.confirm(dict.are_you_sure, dict.alert, () => self.deletePost())
  }


  render() {
    const { post, sheetOpened, channels, comments, rating, rnd, replyTo, deletable } = this.state;
    return (
      <Page>
        <Navbar title={dict.posts} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <PostShow 
        post={post} comments={comments} rating={this.rating} rnd={rnd}
        channels={channels} submitComment={this.submitComment} replyTo={replyTo}
        deleteComment={this.deleteComment} submit={this.submit} 
        deleteCommentConfirm={this.deleteCommentConfirm} replyToComment={this.replyToComment}
        removeReply={this.removeReply} deletable={deletable}
        interaction={this.interaction} handleChange={this.handleChangeValue} 
        loadMore={this.loadMore} deletePost={this.deletePost}
        deletePostConfirm={this.deletePostConfirm}
        
        />
      </Page>
    );
  }
}
