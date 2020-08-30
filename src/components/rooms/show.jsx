import React from "react";
import { Page, Col, Icon } from "framework7-react";
import ModelStore from "../../stores/ModelStore";
import RoomIndex from "../../containers/rooms/show";
import * as MyActions from "../../actions/MyActions";
import { dict } from "../../Dict";
import { conf } from "../../conf";
import Janus from "../../janus.js";
import Framework7 from "framework7/framework7.esm.bundle";
//import {newRemoteFeed} from "./newRemoteFeed.js"

export default class Layout extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.sessionCreate = this.sessionCreate.bind(this);
    this.registerUsername = this.registerUsername.bind(this);
    this.newRemoteFeed = this.newRemoteFeed.bind(this);
    this.publishCamera = this.publishCamera.bind(this);
    this.publishMicrophone = this.publishMicrophone.bind(this);
    this.off = this.off.bind(this);
    this.on = this.on.bind(this);
    this.pageAfterIn = this.pageAfterIn.bind(this);
    this.streamAttacher = this.streamAttacher.bind(this);
    this.unmute = this.unmute.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.sendData = this.sendData.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.speakRequest = this.speakRequest.bind(this);
    this.publishData = this.publishData.bind(this);
    this.removeRequest = this.removeRequest.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.removeParticipant = this.removeParticipant.bind(this);
    this.unPublishData = this.unPublishData.bind(this);
    


    this.state = {
      token: window.localStorage.getItem("token"),
      shortners: null,
      server: conf.janusServer,
      janus: null,
      sfutest: null,
      opaqueId: "videoroomtest-" + Janus.randomString(12),
      roomId: null,
      myusername: null,
      myid: null,
      mystream: null,
      mypvtid: "videoroomtest-" + Janus.randomString(12),
      pin: null,
      feeds: [],
      activeFeeds: [],
      bitrateTimer: [],
      userUUID: null,
      fullname: null,
      urls: [],
      publisedCamera: false,
      publishedMicrophone: false,
      muted: true,
      requests: [],
      lowFeeds: [],
      participants: []
    };
  }
  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.setInstance);
    this.unPublishData();
  }

  setInstance() {

  }

  updateSubscribers() {
    var data = { room_id: this.state.roomId }
    MyActions.setInstance('subscribers', data, this.state.token);
  }

  renewSubscribers() {
    MyActions.getInstance('subscribers', this.state.roomId, this.state.token);
  }

  sessionCreate() {
    var self = this;
    Janus.init({
      debug: "all",
      callback: function () {
        var janus = new Janus({
          server: self.state.server,
          success: function () {
            janus.attach({
              plugin: "janus.plugin.videoroom",
              opaqueId: self.state.opaqueId,
              success: function (pluginHandle) {
                self.setState({ janus: janus });
                self.setState({ sfutest: pluginHandle });
                Janus.log(
                  "Plugin attached! (" +
                  self.state.sfutest.getPlugin() +
                  ", id=" +
                  self.state.sfutest.getId() +
                  ")"
                );
                Janus.log("  -- This is a publisher/manager");
                self.registerUsername();
                //self.publishData();
              },
              error: function (error) {
                Janus.error("  -- Error attaching plugin...", error);
                window.alert("Error attaching plugin... " + error);
              },
              consentDialog: function (on) {
                Janus.debug(
                  "Consent dialog should be " + (on ? "on" : "off") + " now"
                );
              },
              iceState: function (state) {
                Janus.log("ICE state changed to " + state);
              },
              mediaState: function (medium, on) {
                Janus.log(
                  "Janus " +
                  (on ? "started" : "stopped") +
                  " receiving our " +
                  medium
                );
              },
              webrtcState: function (on) {
                Janus.log(
                  "Janus says our WebRTC PeerConnection is " +
                  (on ? "up" : "down") +
                  " now"
                );
              },
              onmessage: function (msg, jsep) {
                Janus.log(" ::: Got a message (publisher) :::", msg);
                var event = msg["videoroom"];
                Janus.debug("Event: " + event);
                if (event) {
                  if (event === "joined") {
                    console.log("joined");
                    self.setState({
                      myid: msg["id"],
                      mypvtid: msg["private_id"],
                    });
                    //self.publishData();

                    if (msg["publishers"]) {
                      var list = msg["publishers"];
                      console.log(
                        "Got a list of available publishers/feeds:",
                        list
                      );
                      for (var f in list) {
                        var id = list[f]["id"];
                        var display = list[f]["display"];
                        var audio = list[f]["audio_codec"];
                        var video = list[f]["video_codec"];
                        Janus.debug(
                          "  >> [" +
                          id +
                          "] " +
                          display +
                          " (audio: " +
                          audio +
                          ", video: " +
                          video +
                          ")"
                        );
                        self.addParticipant(list[f]["id"], list[f]["display"]);
                        self.newRemoteFeed(id, display, audio, video);
                        //}

                      }
                    }
                  } else if (event === "destroyed") {
                    // The room has been destroyed
                    Janus.warn("The room has been destroyed!");
                  } else if (event === "event") {
                    // Any new feed to attach to?
                    if (msg["publishers"]) {
                      var list = msg["publishers"];
                      Janus.log(
                        "Got a list of available publishers/feeds:",
                        list
                      );
                      for (var f in list) {
                        var id = list[f]["id"];
                        var display = list[f]["display"];
                        var audio = list[f]["audio_codec"];
                        var video = list[f]["video_codec"];
                        Janus.log(
                          "  >> [" +
                          id +
                          "] " +
                          display +
                          " (audio: " +
                          audio +
                          ", video: " +
                          video +
                          ")"
                        );
                        // if(audio || video) {
                        self.addParticipant(list[f]["id"], list[f]["display"]);
                        self.newRemoteFeed(id, display, audio, video);
                        // }
                      }
                    } else if (msg["leaving"]) {
                      var leaving = msg["leaving"];
                      console.log("Publisher leaving: " + leaving);
                      self.setState(
                        {
                          feeds: self.state.feeds.filter(
                            (item) => item.rfid != leaving
                          ),
                        },
                        () => console.log("feeds: >>>>", self.state.feeds)
                      );
                      var unPublishedFeed = self.state.feeds.filter(
                        (item) => item.rfid === leaving
                      );
                      var remoteFeed = unPublishedFeed.shift();
                      if (remoteFeed != null) {
                        remoteFeed.detach();
                      }
                      self.removeParticipant(leaving)
                    } else if (msg["unpublished"]) {
                      var unpublished = msg["unpublished"];
                      console.log("Publisher left: " + unpublished);
                      if (unpublished === "ok") {
                        self.state.sfutest.hangup();
                        return;
                      }
                      self.setState(
                        {
                          feeds: self.state.feeds.filter(
                            (item) => item.rfid != unpublished
                          ),
                        }
                      );
                      var unPublishedFeed = self.state.feeds.filter(
                        (item) => item.rfid === unpublished
                      );

                      self.setState(
                        {
                          lowFeeds: self.state.lowFeeds.filter(
                            (item) => item.rfid != unpublished
                          ),
                        }
                      );

                      var remoteFeed = unPublishedFeed.shift();
                      if (remoteFeed != null) {
                        remoteFeed.detach();
                      }
                      self.removeParticipant(unpublished)
                    } else if (msg["error"]) {
                    }
                    else if (msg["configured"]) {
                      // self.$$("#video-" + self.state.sfutest.id).hide();
                    }
                    else if (msg["joining"]) {
                      self.addParticipant(msg["joining"].id, msg["joining"].display);
                      //self.newRemoteFeed(msg["joining"].id, msg["joining"].display,'none', 'none');
                    }
                  }
                }
                if (jsep) {
                  Janus.log("Handling SDP as well...", jsep);
                  self.state.sfutest.handleRemoteJsep({ jsep: jsep });
                  //self.$$("#video-" + self.state.sfutest.id).hide();
                }
              },
              onlocalstream: function (stream) {
                console.log(" ::: Got a local stream :::", stream);
                console.log(self.state.sfutest.id);
                var exisiting = self.state.feeds.filter(
                  (item) => item.id === self.state.sfutest.id
                );
                if (exisiting.length === 0) {
                  self.setState({
                    feeds: self.state.feeds.concat(self.state.sfutest),
                  });

                }
                var videoTracks = stream.getVideoTracks();
                if (!videoTracks || videoTracks.length === 0) {
                  self.$$("#video-" + self.state.sfutest.id).hide();
                } else {


                  self.$$("#video-" + self.state.sfutest.id).show();
                  Janus.attachMediaStream(
                    document.getElementById("video-" + self.state.sfutest.id),
                    stream
                  );
                  document.getElementById("video-" + self.state.sfutest.id).muted = true;
                }
              },
              onremotestream: function (stream) {
                Janus.log(" ::: Got a remote stream :::", stream);
                // The publisher stream is sendonly, we don't expect anything here
              },
              ondata: function (data) {
                Janus.debug("We got data from the DataChannel!", data);
                //$('#datarecv').val(data);
              },
              oncleanup: function () {

                Janus.log(
                  " ::: Got a cleanup notification: we are unpublished now :::"
                );
              },
            });
          },
          error: function (error) {
            Janus.error(error);
            window.alert(error, function () {
              window.location.reload();
            });
          },
          destroyed: function () {
            window.location.reload();
          },
        });
      },
    });
  }
  registerUsername() {
    var self = this;
    var register = {
      request: "join",
      room: self.state.roomId,
      ptype: "publisher",
      display: self.state.fullname + " §"+self.state.userUUID,
      pin: self.state.pin
    };
    self.state.sfutest.send({ message: register });
    this.publishData();
  }

  addParticipant(id,p){
    var self = this;
    var participant = p.split('§')
    var exisiting = self.state.participants.filter(
      (item) => item.uuid === participant[1]
    );
    if (exisiting.length === 0) {
      self.setState({ participants: self.state.participants.concat({id:id, display: participant[0], uuid: participant[1]}) });
    }
  }

  removeParticipant(id){
    var self = this;
    console.log(self.state.participants)
    self.setState({ participants: self.state.participants.filter(
      (item) => item.id !== id
    )})

  }

  newRemoteFeed(id, feeds, display, audio, video) {
    var self = this;
    // A new feed has been published, create a new plugin handle and attach to it as a subscriber
    var remoteFeed = null;
    self.state.janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: this.state.opaqueId,
      success: function (pluginHandle) {
        remoteFeed = pluginHandle;
        remoteFeed.simulcastStarted = false;
        Janus.log(
          "Plugin attached! (" +
          remoteFeed.getPlugin() +
          ", id=" +
          remoteFeed.getId() +
          ")"
        );
        Janus.log("  -- This is a subscriber");
        // We wait for the plugin to send us an offer
        var subscribe = {
          request: "join",
          room: self.state.roomId,
          ptype: "subscriber",
          pin: self.state.pin,
          feed: id,
          private_id: self.state.mypvtid,
        };
        // In case you don't want to receive audio, video or data, even if the
        // publisher is sending them, set the 'offer_audio', 'offer_video' or
        // 'offer_data' properties to false (they're true by default), e.g.:
        // 		subscribe["offer_video"] = false;
        // For example, if the publisher is VP8 and this is Safari, let's avoid video
        if (
          Janus.webRTCAdapter.browserDetails.browser === "safari" &&
          (video === "vp9" || (video === "vp8" && !Janus.safariVp8))
        ) {
          if (video) video = video.toUpperCase();
          console.log(
            "Publisher is using " +
            video +
            ", but Safari doesn't support it: disabling video"
          );
          subscribe["offer_video"] = false;
        }
        remoteFeed.videoCodec = video;
        remoteFeed.send({ message: subscribe });
        //console.log(subscribe)
        //console.log(remoteFeed)
      },
      error: function (error) {
        Janus.error("  -- Error attaching plugin...", error);
        window.alert("Error attaching plugin... " + error);
      },
      onmessage: function (msg, jsep) {
        Janus.debug(" ::: Got a message (subscriber) :::", msg);
        var event = msg["videoroom"];
        Janus.log("Event: " + event);
        if (msg["error"]) {
          window.alert(msg["error"]);
        } else if (event) {
          if (event === "attached") {
            console.log('remoteFeed:', remoteFeed)

            self.setState({ feeds: self.state.feeds.concat(remoteFeed) });
            self.setState({ lowFeeds: self.state.lowFeeds.concat(remoteFeed) });
            if (!video || !audio) {
              self.$$("#video-" + remoteFeed.id).hide();
              self.$$("#lowVideo-" + remoteFeed.id).hide();
            }
            //  }

            remoteFeed.rfid = msg["id"];
            remoteFeed.rfdisplay = msg["display"];
            Janus.log(
              "Successfully attached to feed " +
              remoteFeed.rfid +
              " (" +
              remoteFeed.rfdisplay +
              ") in room " +
              msg["room"]
            );
          } else if (event === "event") {
          } else {
            // What has just happened?
          }
        }
        if (jsep) {
          Janus.log("Handling SDP as well...", jsep);
          remoteFeed.createAnswer({
            jsep: jsep,
            // Add data:true here if you want to subscribe to datachannels as well
            // (obviously only works if the publisher offered them in the first place)
            media: { audioSend: false, videoSend: false, data: true }, // We want recvonly audio/video
            success: function (jsep) {
              Janus.log("Got SDP!", jsep);
              var body = { request: "start", room: self.state.roomId };
              remoteFeed.send({ message: body, jsep: jsep });
            },
            error: function (error) {
              Janus.log("WebRTC error:", error);
              window.alert("WebRTC error... " + error.message);
            },
          });
        }
      },
      iceState: function (state) {
        Janus.log(
          "ICE state of this WebRTC PeerConnection (feed #" +
          remoteFeed.rfindex +
          ") changed to " +
          state
        );
        
      },
      webrtcState: function (on) {
        Janus.log(
          "Janus says this WebRTC PeerConnection (feed #" +
          remoteFeed.rfindex +
          ") is " +
          (on ? "up" : "down") +
          " now"
        );
        if(on === "down") {
          self.removeParticipant(remoteFeed.rfid)
        }
        
        //console.log(remoteFeed.rfid)
      },
      onlocalstream: function (stream) {
        console.log('>>>>>>>>>>>', stream)
      },
      onremotestream: function (stream) {
        var videoTracks = stream.getVideoTracks();
        if (!videoTracks || videoTracks.length === 0) {
          console.log(self.$$("#video-" + remoteFeed.id))
          self.$$("#video-" + remoteFeed.id).hide();
          self.$$("#lowVideo-" + remoteFeed.id).hide();
        } else {
          self.$$("#video-" + remoteFeed.id).show()
          self.$$("#lowVideo-" + remoteFeed.id).show()
          Janus.attachMediaStream(
            document.getElementById("video-" + remoteFeed.id),
            stream
          );
          Janus.attachMediaStream(
            document.getElementById("lowVideo-" + remoteFeed.id),
            stream
          );
        }

      },
      ondata: function (data) {
        //Janus.debug("We got data from the DataChannel!", data);
        var message = JSON.parse(data)
        //console.log(message)
        var exisiting = self.state.requests.filter(
          (item) => item.uuid === message['uuid']
        );
        // console.log(exisiting)
        if (exisiting.length === 0 && message['request'] === 'up') {
          self.setState({ requests: self.state.requests.concat({ display: message['display'], uuid: message['uuid'] }) });
        }

        if (message['request'] === 'removeRequest') {
          self.setState({
            requests: self.state.requests.filter(item => item.uuid != message['uuid'])
          });
        }
        console.log(message)

        if (message['request'] === 'acceptRequest') {
          self.setState({
            requests: self.state.requests.filter(item => item.uuid != message['uuid'])
          });
          if(message['uuid'] === self.state.userUUID){
            console.log('Publishing Camera');
            self.publishCamera()
          }
        }

        //console.log(self.state.requests)
        //$('#datarecv').val(data);
      },
      oncleanup: function () {
        Janus.log(
          " ::: Got a cleanup notification (remote feed " + id + ") :::"
        );
      },
    });
  }

  streamAttacher(feed) {
    if (feed.id && feed.webrtcStuff && feed.webrtcStuff.remoteStream) {
      Janus.attachMediaStream(
        document.getElementById("video-" + feed.id),
        feed.webrtcStuff.remoteStream
      );
    }
  }

  sendData() {
    var message = {
      textroom: "message",
      transaction: Janus.randomString(12),
      room: this.state.roomId,
      text: 'UUUUU',
    };
    this.state.sfutest.data({
      text: JSON.stringify(message),
      error: function (reason) { console.log(reason); },
      success: function () { console.log('sent'); },
    });
  }

  speakRequest() {
    var self = this;
    var message = {
      textroom: "message",
      transaction: Janus.randomString(12),
      room: this.state.roomId,
      request: 'up',
      uuid: this.state.userUUID,
      display: this.state.fullname
    };
    console.log(message)
    this.state.sfutest.data({
      text: JSON.stringify(message),
      error: function (reason) { console.log(reason); },
      success: function () {
        console.log('request sent')
        var exisiting = self.state.requests.filter(
          (item) => item.uuid === message['uuid']
        );
        if (exisiting.length === 0 && message['request'] === 'up') {
          self.setState({ requests: self.state.requests.concat({ display: message['display'], uuid: message['uuid'] }) });
        }
      },
    });
  }

  publishData() {
    var self = this;
    self.state.sfutest.createOffer({
      media: {
        audioRecv: false,
        videoRecv: false,
        data: true,
        videoSend: false,
        //removeVideo: false,
        audioSend: false,
      },

      success: function (jsep) {
        Janus.debug("********* Got publisher SDP!", jsep);
        if (jsep) {
          var publish = {
            request: "publish",
            audio: true,
            video: true,
            data: true,
          };
          self.state.sfutest.send({ message: publish, jsep: jsep });
        }
        //self.setState({ publisedCamera: !self.state.publisedCamera });
      },
      error: function (error) {
        Janus.error("***** WebRTC error:", error);
      },
    });
  }

  unPublishData() {
    var self = this;
    self.state.sfutest.createOffer({
      media: {
        audioRecv: false,
        videoRecv: false,
        data: false,
        videoSend: false,
        //removeVideo: false,
        audioSend: false,
      },

      success: function (jsep) {
        Janus.debug("********* Got publisher SDP!", jsep);
        if (jsep) {
          var unPublish = {
            request: "unpublish",
            audio: false,
            video: false,
            data: false,
          };
          self.state.sfutest.send({ message: unPublish, jsep: jsep });
        }
        //self.setState({ publisedCamera: !self.state.publisedCamera });
      },
      error: function (error) {
        Janus.error("***** WebRTC error:", error);
      },
    });
  }

  publishCamera() {
    var self = this;
    self.state.sfutest.createOffer({
      media: {
        audioRecv: false,
        videoRecv: false,
        data: true,
        videoSend: !self.state.publisedCamera,
        removeVideo: self.state.publisedCamera,
        audioSend: self.state.publishedMicrophone,
      },

      success: function (jsep) {
        Janus.debug("********* Got publisher SDP!", jsep);
        if (jsep) {
          var publish = {
            request: "configure",
            audio: self.state.publishedMicrophone,
            video: !self.state.publisedCamera,
            data: true,
            bitrate: 32 * 1000,
            bitrate_cap: true,
            videocodec: 'vp8',
          };
          self.state.sfutest.send({ message: publish, jsep: jsep });
        }
        self.setState({ publisedCamera: !self.state.publisedCamera });
      },
      error: function (error) {
        Janus.error("***** WebRTC error:", error);
      },
    });
  }

  publishMicrophone() {
    var self = this;
    self.state.sfutest.createOffer({
      media: {
        audioRecv: false,
        videoRecv: false,
        data: true,
        audioSend: !self.state.publishedMicrophone,
        removeAudio: self.state.publishedMicrophone,
        videoSend: self.state.publisedCamera,
      },

      success: function (jsep) {
        Janus.debug("********* Got publisher SDP!", jsep);
        if (jsep) {
          var publish = { request: "configure", data: true, audio: !self.state.publishedMicrophone, video: self.state.publisedCamera };
          self.state.sfutest.send({ message: publish, jsep: jsep });
          self.setState({
            publishedMicrophone: !self.state.publishedMicrophone,
          });
        }
      },
      error: function (error) {
        Janus.error("***** WebRTC error:", error);
      },
    });
  }

  off() {
    console.log(this.state.feeds);
    var body = {
      request: "switch",
      feed: this.state.feeds[1].rfid,
      video: false,
    };
    this.state.feeds[1].send({ message: body });
  }

  on() {
    console.log(this.state.feeds);
    var body = {
      request: "switch",
      feed: this.state.feeds[1].rfid,
      video: true,
    };
    this.state.feeds[1].send({ message: body });
  }

  componentDidMount() {
    MyActions.getInstance('rooms', this.$f7route.params['roomId'], this.state.token);
  }

  getInstance() {
    var room = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (room && klass === 'Room') {
      this.setState({
        room: room,
        id: room.id,
        roomId: room.room_id,
        pin: room.pin,
        userUUID: room.user_uuid,
        fullname: room.user_fullname,
        title: room.title,
      }, () => this.pageAfterIn());
    }
    // console.log(room)
    this.$$('.btn').show();
  }

  pageAfterIn() {
    this.sessionCreate();
    this.unmute();
  }

  loadData() {
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({
      text: dict.receiving,
      closeTimeout: 2000,
      position: "top",
    });
    MyActions.getList("shortners", this.state.page, {}, this.state.token);
  }

  getList() {
    var shortners = ModelStore.getList();
    var klass = ModelStore.getKlass();
    if (shortners && klass === "Shortner") {
      this.setState({
        shortners: shortners,
      });
    }
  }

  unmute() {
    this.setState({ muted: false });
  }

  acceptRequest(uuid) {

    var self = this;
    var message = {
      textroom: "message",
      transaction: Janus.randomString(12),
      room: this.state.roomId,
      request: 'acceptRequest',
      uuid: uuid,
    };
    this.state.sfutest.data({
      text: JSON.stringify(message),
      error: function (reason) { console.log(reason); },
      success: function () {
        self.setState({
          requests: self.state.requests.filter(item => item.uuid != uuid)
        });
      },
    });
  }

  removeRequest(uuid) {
    var self = this;
    var message = {
      textroom: "message",
      transaction: Janus.randomString(12),
      room: this.state.roomId,
      request: 'removeRequest',
      uuid: uuid
    };
    this.state.sfutest.data({
      text: JSON.stringify(message),
      error: function (reason) { console.log(reason); },
      success: function () {
        self.setState({
          requests: self.state.requests.filter(item => item.uuid != uuid)
        });
      },
    });
  }

  render() {
    const {
      shortners,
      urls,
      publishedMicrophone,
      publisedCamera,
      feeds,
      muted,
      lowFeeds,
      requests,
      participants
    } = this.state;
    return (
      <RoomIndex
        pageAfterIn={this.pageAfterIn}
        shortners={shortners}
        streamAttacher={this.streamAttacher}
        urls={urls}
        off={this.off}
        on={this.on}
        feeds={feeds}
        muted={muted}
        lowFeeds={lowFeeds}
        requests={requests}
        participants={participants}
        unmute={this.unmute}
        publisedCamera={publisedCamera}
        publishedMicrophone={publishedMicrophone}
        publishCamera={this.publishCamera}
        publishMicrophone={this.publishMicrophone}
        sendData={this.sendData}
        speakRequest={this.speakRequest}
        accept={this.accept}
        removeRequest={this.removeRequest}
        acceptRequest={this.acceptRequest}
      />
    );
  }
}
