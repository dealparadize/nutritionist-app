import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from "../providers/user.provider";
import { OneSignal } from "@ionic-native/onesignal";
export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
  url?: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  user: any;

  rootPage: any = 'LoginPage';

  appPages: PageInterface[] = [
    { title: 'Inicio', name: 'TabsPage', component: 'TabsPage', tabComponent: 'TabsPage', index: 0, icon: 'home' },
    { title: 'Agendar', name: 'BookingPage', component: 'BookingPage', tabComponent: 'BookingPage', icon: 'bookmarks' },
    { title: 'Despensa', name: 'PantryPage', component: 'PantryPage', tabComponent: 'PantryPage', icon: 'list' },
    { title: 'Acerca de', name: 'AboutPage', component: 'AboutPage', tabComponent: 'AboutPage', icon: 'information-circle' },
    { title: 'Logout', name: 'LoginPage', component: 'LoginPage', icon: 'log-out', logsOut: true }
  ];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public events: Events,
    public menu: MenuController,
    private oneSignal: OneSignal,
    public userProvider: UserProvider
  ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.disableMenu();
      statusBar.styleDefault();
      splashScreen.hide();
      this.listenToLoginEvents();

      var _this_ = this;
      var notificationOpenedCallback = function (jsonData) {
        //console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));

        _this_.userProvider.getUser().then(data => {
          console.log("userinstorage");
          console.log(data);
          if (data != null) {
            _this_.nav.setRoot("AboutPage");
          } else {
            _this_.nav.setRoot("LoginPage");
          }

        });
      };

      this.oneSignal
        .startInit("ee63927a-ed8e-4510-a20e-687d880eb211", "62647511192")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

    });
  }


  openPage(page: PageInterface) {
    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userProvider.logout();
    }

    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    // console.log(this.nav.getActiveChildNavs());
    // console.log(page);

    if (this.nav.getActiveChildNavs() && page.index != undefined && this.nav.getActiveChildNavs()[0] != undefined) { //this.nav.getActiveChildNavs()[0]!=undefined
      this.nav.getActiveChildNavs()[0].select(page.index);
      // Set the root of the nav with params if it's a tab index
    } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
    // this.isActive(page);
  }

  enableMenu() {
    this.menu.enable(true, 'appMenu');
  }

  disableMenu() {
    this.menu.enable(false, 'appMenu');
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu();
      this.userProvider.getUser()
        .then(user => {
          if (user) {
            this.user = user;
          }
        });
    });

    this.events.subscribe('user:logout', () => {
      this.rootPage = 'LoginPage';
    });


  }

}

