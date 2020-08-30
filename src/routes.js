import HomePage from './containers/layouts/HomePage.jsx';
import NotFoundPage from './containers/layouts/NotFoundPage';
import PanelRightPage from './containers/layouts/PanelRightPage';


import MetaShow from './components/metas/show';
import MetaIndex from './components/metas/index';
import MetaCreate from './components/metas/create';
import MetaUpdate from './components/metas/update';


import PostShow from './components/posts/show';
import PostIndex from './components/posts/index';
import PostCreate from './components/posts/create';
import PostUpdate from './components/posts/update';

import NotificationIndex from './components/notifications/index';

import ChannelShow from './components/channels/show';
import ChannelIndex from './components/channels/index';
import ChannelCreate from './components/channels/create';
import ChannelUpdate from './components/channels/update';

import RoleShow from './components/roles/show';
import RoleIndex from './components/roles/index';
import RoleCreate from './components/roles/create';
import RoleUpdate from './components/roles/update';


import SettingShow from './components/settings/show';
import SettingIndex from './components/settings/index';
import SettingCreate from './components/settings/create';
import SettingUpdate from './components/settings/update';


import ProfileShow from './components/profiles/show';
import ProfileIndex from './components/profiles/index';
import ProfileCreate from './components/profiles/create';
import ProfileUpdate from './components/profiles/update';

import FriendshipIndex from './components/friendships/index';

import PrivacyIndex from './components/privacy/index';

import BookmarkIndex from './components/bookmarks/index';

import Login from './components/users/Login';
import LoginJwt from './components/users/LoginJwt';
import SignUp from './components/users/SignUp';
import Verification from './components/users/Verification';

import RoomShow from './components/rooms/show';
import RoomIndex from './components/rooms/index';
import RoomCreate from './components/rooms/create';
import RoomUpdate from './components/rooms/update';

import NotificationSettingUpdate from './components/notification_settings/update';


export default [
  {
    path: '/',
    component: PostIndex,
  },
  {
    path: '/login/',
    component: Login,
  },
  {
    path: '/sign_up/',
    component: SignUp,
  },
  {
    path: '/verification/:email',
    component: Verification,
  },
  {
    path: '/login_jwt/:token',
    component: LoginJwt,
  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '/bookmarks/',
    component: BookmarkIndex,
  },

  {
    path: '/rooms/',
    component: RoomIndex,
  },
  {
    path: '/rooms/:roomId/edit',
    component: RoomUpdate,
  },
  {
    path: '/rooms/new',
    component: RoomCreate,
  },
  {
    path: '/rooms/:roomId',
    component: RoomShow,
  },

  {
    path: '/metas/',
    component: MetaIndex,
  },
  {
    path: '/metas/:metaId/edit',
    component: MetaUpdate,
  },
  {
    path: '/metas/new',
    component: MetaCreate,
  },
  {
    path: '/metas/:metaId',
    component: MetaShow,
  },

  {
    path: '/notifications/',
    component: NotificationIndex,
  },

  {
    path: '/posts/',
    component: PostIndex,
  },
  {
    path: '/posts/:postId/edit',
    component: PostUpdate,
  },
  {
    path: '/posts/new',
    component: PostCreate,
  },
  {
    path: '/posts/:postId',
    component: PostShow,
  },

  {
    path: '/channels/',
    component: ChannelIndex,
  },
  {
    path: '/channels/:channelId/edit',
    component: ChannelUpdate,
  },
  {
    path: '/channels/new',
    component: ChannelCreate,
  },
  {
    path: '/channels/:channelId',
    component: ChannelShow,
  },

  {
    path: '/roles/',
    component: RoleIndex,
  },
  {
    path: '/roles/:roleId/edit',
    component: RoleUpdate,
  },
  {
    path: '/roles/new',
    component: RoleCreate,
  },
  {
    path: '/roles/:roleId',
    component: RoleShow,
  },

  {
    path: '/profiles/',
    component: ProfileIndex,
  },
  {
    path: '/profiles/:profileId/edit',
    component: ProfileUpdate,
  },
  {
    path: '/profiles/new',
    component: ProfileCreate,
  },
  {
    path: '/profiles/:profileId',
    component: ProfileShow,
  },
  {
    path: '/friendships/:sourceId',
    component: FriendshipIndex,
  },
  {
    path: '/privacy_settings/',
    component: PrivacyIndex,
  },

  {
    path: '/settings/',
    component: SettingIndex,
  },
  {
    path: '/settings/:settingId/edit',
    component: SettingUpdate,
  },
  {
    path: '/settings/new',
    component: SettingCreate,
  },
  {
    path: '/settings/:settingId',
    component: SettingShow,
  },

  {
    path: '/notification_settings/',
    component: NotificationSettingUpdate,
  },


  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
