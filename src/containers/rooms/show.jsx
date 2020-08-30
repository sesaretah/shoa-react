import React from "react";
import {
  Page,
  Card,
  Row,
  Col,
  Fab,
  Icon,
  Navbar,
  Link,
  Button,
  CardContent,
  CardFooter,
  CardHeader,
  FabButtons,
  Chip,
  Block,
  Subnavbar,
} from "framework7-react";

import { dict } from "../../Dict";


const RoomIndex = (props) => {
  function videos() {
    var result = [];
    if (props.feeds) {
      {
        props.feeds.map((feed) => {
          result.push(
            <div class="col-100 tablet-33" key={"container-" + feed.id}>
              <video
                controls={true}
                key={feed.id}
                id={"video-" + feed.id}
                src=""
                width="320"
                height="240"
                autoPlay
                playsInline
                muted={props.muted}
              />
            </div>
          );
          props.streamAttacher(feed)
        });
      }
    }
    return result;
  }

  function lowVideos() {
    var result = [];
    if (props.lowFeeds) {
      {
        props.lowFeeds.map((feed) => {
          result.push(
            <div class="col-100 tablet-33" key={"container-" + feed.id}>
              <video
                controls={true}
                key={feed.id}
                id={"lowVideo-" + feed.id}
                src=""
                width="160"
                height="120"
                autoPlay
                playsInline
                muted={props.muted}
              />
            </div>
          );
          props.streamAttacher(feed)
        });
      }
    }
    return result;
  }

  function requests() {
    var result = [];
    if (props.requests) {
      props.requests.map((request) => {
        result.push(
          <div className="chip color-blue">
            <a onClick={() => props.acceptRequest(request.uuid)}>
              <div className="chip-media bg-color-orange">
                <i class="fa fa-level-up" aria-hidden="true"></i>
              </div>
            </a>

            <div className="chip-label  mr-2">{request.display}</div>
            <a onClick={() => props.removeRequest(request.uuid)} className="chip-delete"></a>
          </div>

        )
      });
    }
    return result;
  }

  function participants() {
    var result = [];
    if (props.participants) {
      props.participants.map((participant) => {
        result.push(
          <div className="chip">

            <div className="chip-label  mr-2">{participant.display}</div>
          </div>

        )
      });
    }
    return result;
  }

  return (
    <Page>
      <Navbar title={dict.profiles} backLink={dict.back}>
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
      </Navbar>
      <Subnavbar className="bg-black subnavbar-black">
        <div></div>
        <div className=''>
          <a onClick={() => props.publishCamera()}><i class="fa fa-video-camera ml-4" aria-hidden="true"></i></a>
          <a onClick={() => props.publishMicrophone()}><i class="fa fa-microphone ml-4" aria-hidden="true"></i></a>
          <a onClick={() => props.sendData()}><i class="fa fa-comment ml-4" aria-hidden="true"></i></a>
          <a onClick={() => props.speakRequest()}><i class="fa fa-hand-paper-o ml-4" aria-hidden="true"></i></a>
        </div>

      </Subnavbar>
      <Block >
        <Row className="center" id="hosts">
          {videos()}
        </Row>
      </Block>

      <Block strong>
        {requests()}
        < hr></hr>
        {participants()}
      </Block >

      <Block >
        {lowVideos()}
      </Block>

    </Page>
  );
};
export default RoomIndex;
