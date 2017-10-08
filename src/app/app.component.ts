import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


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

  rootPage: any = 'LoginPage';

  appPages: PageInterface[] = [
    { title: 'Inicio', name: 'TabsPage', component: 'TabsPage', tabComponent: 'TabsPage', index: 0, icon: 'home' },
    { title: 'Agendar', name: 'BookingPage', component: 'BookingPage', tabComponent: 'BookingPage',icon: 'bookmarks' },
    { title: 'Despensa', name: 'PantryPage', component: 'PantryPage', tabComponent: 'PantryPage', icon: 'list' },
    { title: 'Acerca de', name: 'AboutPage', component: 'AboutPage', tabComponent: 'AboutPage', icon: 'information-circle' },
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  openPage(page: PageInterface) {
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

    // if (page.logsOut === true) {
    //   // Give the menu time to close before changing to logged out
    //   this.userProvider.logout();
    // }

    // this.isActive(page);
  }
}

