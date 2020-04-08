import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import ProfileIndex from "../../containers/profiles/index"
import * as MyActions from "../../actions/MyActions";
import { dict} from '../../Dict';
import Framework7 from 'framework7/framework7.esm.bundle';


export default class Layout extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.search = this.search.bind(this);
    this.interaction = this.interaction.bind(this);
    
    
    
    this.state = {
      token: window.localStorage.getItem('token'),
      profiles: null,
      query: null,
    }
  }
  componentWillMount() {
    ModelStore.on("got_list", this.getList);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_list", this.getList);
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    MyActions.getList('profiles', this.state.page);
  }

  search(obj){
    this.setState(obj, () => {
      MyActions.getList('profiles/search', this.state.page, {q: this.state.query});
  });    
  }

  getList() {
    var profiles = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (profiles && klass === 'Profile'){
      this.setState({
        profiles: profiles,
      });
    }
  }

  interaction(interaction_type, interactionable_id, interactionable_type, source_type=null, source_id=null){
    var data = {interaction_type: interaction_type, interactionable_id: interactionable_id, interactionable_type: interactionable_type, source_type: source_type, source_id: source_id}
    MyActions.setInstance('interactions', data, this.state.token);
  }

  render() {
    const {profiles} = this.state;
    return(<ProfileIndex profiles={profiles} interaction={this.interaction} search={this.search}/>)
  }
}
