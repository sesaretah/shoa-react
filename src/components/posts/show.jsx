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


export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.interaction = this.interaction.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.getList = this.getList.bind(this);
    this.submit = this.submit.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.loadMore = this.loadMore.bind(this);




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
    this.$$('.some-link').on('taphold', function (f7) {
      f7.dialog.alert('Tap hold fired!');
    });
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
        comments: post.comments
      });
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
    console.log(channels)
  }

  setInstance() {
    var post = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (post && klass === 'Post') {
      this.setState({
        post: post,
        comments: post.comments,
        page: 1
      });
    }
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

  submit() {
    var data = { post_id: this.state.id, channel_id: this.state.selectedChannel }
    MyActions.setInstance('shares', data, this.state.token);
    const self = this;
    self.$f7.sheet.close('.demo-sheet')
  }

  submitComment() {
    var data = { post_id: this.state.id, content: this.state.commentContent }
    MyActions.setInstance('comments', data, this.state.token);
  }

  removeComment(id) {
    var data = { id: id }
    MyActions.removeInstance('comments', data, this.state.token, this.state.page);
  }

  render() {
    const { post, sheetOpened, channels, comments } = this.state;
    return (
      <Page>
        <Navbar title={dict.posts} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <PostShow post={post} comments={comments} channels={channels} submitComment={this.submitComment} removeComment={this.removeComment} submit={this.submit} interaction={this.interaction} handleChange={this.handleChangeValue} loadMore={this.loadMore} />
      </Page>
    );
  }
}
