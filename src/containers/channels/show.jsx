import React from "react";
import { Page, Navbar, List, BlockTitle, Link, Card, Block, Row, Col, Button, CardHeader, CardContent } from 'framework7-react';
import { dict } from '../../Dict';
import InteractionMenu from "../interactions/menu"
import ShareMenu from "../shares/menu"
import PostList from "../posts/list"

const ChannelShow = (props) => {
  if (props.channel) {
    console.log(props.channel.posts)
    return (
      <React.Fragment>
        <Block>
          <Row noGap>
            <Col width='80'></Col>

            <Col width="20">
              <Button><InteractionMenu model={props.channel} klass='Channel' interaction={props.interaction} sourceType='Channel' sourceId={props.channel.id} /></Button>
            </Col>
          </Row>
        </Block>
        <Row noGap>
          <Col width='100' tabletWidth='50'>
            <Card>
              <CardHeader className='fs-12'>{props.channel.title}</CardHeader>
              <CardContent className='lightgray-color fs-12'>{props.channel.content}</CardContent>
            </Card>
          </Col>
          <Col width='100' tabletWidth='50'>
            <Card>
              <CardHeader className='fs-12'>{dict.admins}</CardHeader>
              <CardContent>
                <Link tooltip={props.channel.profile.fullname} href={'/profiles/' + props.channel.profile.id}><div className="demo-facebook-avatar"><img src={props.channel.profile.avatar} width="34" height="34" /></div></Link>
              </CardContent>
            </Card>
          </Col>
        </Row>

        <BlockTitle>{dict.recent_posts}</BlockTitle>
        <PostList posts={props.channel.posts} interaction={props.interaction} sourceType='Channel' sourceId={props.channel.id} />
      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default ChannelShow;
