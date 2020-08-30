import React from "react"
import { Page, Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import PostIndex from "../../containers/posts/index"
import * as MyActions from "../../actions/MyActions";
import { loggedIn } from "../../components/users/loggedIn.js"


export default class Post extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.loggedIn = loggedIn.bind(this);
    this.interaction = this.interaction.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.search = this.search.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.getInstance = this.getInstance.bind(this);


    this.state = {
      token: window.localStorage.getItem('token'),
      posts: [],
      query: null,
      page: 1,
      ability: null,
      profileId: null,
      allowInfinite: true,
      showPreloader: true,
    }
  }
  componentWillMount() {
    ModelStore.on("got_list", this.getList);
    ModelStore.on("set_instance", this.setInstance);
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_list", this.getList);
    ModelStore.removeListener("set_instance", this.setInstance);
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount() {
    this.loggedIn();
    this.loadData();
  }

  loadData() {
    MyActions.getList('posts', this.state.page, {}, this.state.token);
    MyActions.getInstance('users', 'role', this.state.token);
  }

  search(obj) {
    this.setState({ posts: [], page: 1 });
    this.setState(obj, () => {
      MyActions.getList('posts/search', this.state.page, { q: this.state.query }, this.state.token);
    });

  }

  setInstance() {
    var post = ModelStore.getIntance()
    if (post) {
      this.setState({ posts: this.state.posts.map(el => (el.id === post.id ? Object.assign({}, el, post) : el)) });
    }
  }


  loadMore() {
    //console.log('loadmore ...')
    if (this.state.query && this.state.query.length > 0) {
      this.setState({ page: this.state.page + 1 }, () => {
        MyActions.getList('posts/search', this.state.page, {q: this.state.query }, this.state.token);
      });
    } else {
      this.setState({ page: this.state.page + 1 }, () => {
        MyActions.getList('posts', this.state.page, {}, this.state.token);
      });
      this.setState({ showPreloader: false });
    }
  }

  getList() {
    var posts = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (posts.length > 0 && klass === 'PostSearch') {
      this.setState({
        posts: posts,
      });
    }
    if (posts.length > 0 && klass === 'Post') {
      this.setState({
        posts: this.state.posts.concat(posts),
      });
    }
    this.setState({ showPreloader: true });
  }


  getInstance() {
    var user = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (user && klass === 'UserRole') {
      this.setState({
        ability: user.the_ability,
        profileId: user.profile_id
      });
    }
  }

  interaction(interaction_type, interactionable_id, interactionable_type, source_type = null, source_id = null) {
    var data = { interaction_type: interaction_type, interactionable_id: interactionable_id, interactionable_type: interactionable_type, source_type: source_type, source_id: source_id }
    MyActions.setInstance('interactions', data, this.state.token);
  }

  render() {
    const { posts , ability, showPreloader} = this.state;
    return (
      <PostIndex 
        interaction={this.interaction} loadMore={this.loadMore} 
        posts={posts} search={this.search} ability={ability}
        showPreloader={showPreloader}
        />)
  }
}
