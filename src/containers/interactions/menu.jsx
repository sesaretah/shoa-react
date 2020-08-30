import React from "react";
import { Actions, ActionsLabel, ActionsGroup, ActionsButton, Icon, Button, Sheet, Toolbar, Link, PageContent, Block} from 'framework7-react';
import { dict} from '../../Dict';


const InteractionMenu = (props) => {
  if (props.model){
    return(
      <React.Fragment>

      <Actions id={"actions-two-groups-"+props.model.id}>
        <ActionsGroup>
          <ActionsLabel>{dict.social_acts}</ActionsLabel>
          <ActionsButton onClick={() => props.interaction('Bookmark', props.model.id, props.klass, props.sourceType, props.sourceId)}><i className="va ml-5 fa fa-bookmark"></i>{dict.bookmark} ({props.model.bookmarks})</ActionsButton>
          <ActionsButton onClick={() => props.interaction('Like', props.model.id, props.klass, props.sourceType, props.sourceId)}><i className="va ml-5 fa fa-heart"></i>{dict.like} ({props.model.likes})</ActionsButton>
          <ActionsButton onClick={() => props.interaction('Follow', props.model.id, props.klass, props.sourceType, props.sourceId)}><i className="va ml-5 fa fa-link"></i>{dict.follow} ({props.model.follows})</ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton color="red">{dict.cancel}</ActionsButton>
        </ActionsGroup>
      </Actions>
      
      <Button tooltip={dict.social_acts} className="col"  href={false} actionsOpen={"#actions-two-groups-"+props.model.id}><i className="va fa fa-users"></i></Button>
      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default InteractionMenu;
