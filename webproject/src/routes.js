/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import BusinessIcon from '@material-ui/icons/Business';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";
import InfoIcon from '@material-ui/icons/Info';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CreateIcon from '@material-ui/icons/Create';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import AboutPage from "views/AboutPage/AboutPage.js"
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AdvertisementPage from "views/AdvertisementPage/AdvertisementPage.js";
import NewAdvertisementPage from "views/AdvertisementPage/NewAdvertisementPage.js"
import NotificationsPage from "views/Notifications/Notifications.js";
import ApplicationsPage from "views/ApplicationsPage/ApplicationsPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import TableChartIcon from '@material-ui/icons/TableChart';

export const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Company Profile",
    icon: BusinessIcon,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/advertisements",
    name: "View Advertisements",
    icon: ChromeReaderModeIcon,
    component: AdvertisementPage,
    layout: "/admin"
  },
  {
    path: "/advertisement/new",
    name: "Publish Advertisement",
    icon: ChromeReaderModeIcon,
    component: NewAdvertisementPage,
    layout: "/admin"
  },
  {
    path: "/applications",
    name: "Applications",
    icon: CollectionsBookmarkIcon,
    component: ApplicationsPage,
    layout: "/admin"
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: TableChartIcon,
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: ExitToAppIcon,
    component: null,
    layout: "/admin"
  }
];

export const landingRoutes = [
  {
    path: "/about",
    name: "Landing",
    icon: InfoIcon,
    component: AboutPage,
    layout: "/landing"
  },
  {
    path: "/login",
    name: "Sign In",
    icon: VpnKeyIcon,
    component: LoginPage,
    layout: "/landing"
  },
  {
    path: "/signup",
    name: "Sign Up",
    icon: CreateIcon,
    component: SignupPage,
    layout: "/landing"
  }
];