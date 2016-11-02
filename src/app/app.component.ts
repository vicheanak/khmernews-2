import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController, AlertController } from 'ionic-angular';
import { SpinnerDialog, StatusBar, Splashscreen, Device, Dialogs } from 'ionic-native';
import {Push, PushToken, Deploy} from '@ionic/cloud-angular';
import {NewsPage} from '../pages/news/news';
import {PushNotification} from '../providers/push-notification';


@Component({
templateUrl: 'app.html',
providers: [PushNotification]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = NewsPage;
    pages: Array<{title: string, name: string, component: any}>;
           snapshotAvailable: boolean = false;
           updateStatus: any;
           loading: boolean;


           constructor(public push: Push, private platform: Platform, private pushNotification: PushNotification, public alertCtrl: AlertController, private deploy: Deploy, public loadingCtrl: LoadingController) {
               this.initializeApp();

               this.pages = [
               { name: '', title: 'ពត៌មានជាតិ', component: NewsPage },
               { name: 'kohsantepheap', title: 'កោះសន្តិភាព', component: NewsPage },
               { name: 'rfa', title: 'អាសុីសេរី', component: NewsPage },
               { name: 'voa', title: 'វីអូអេ', component: NewsPage },
               { name: 'thmeythmey', title: 'ថ្មីថ្មី', component: NewsPage },
               { name: 'phnompenhpost', title: 'ភ្នំពេញ ប៉ុស្តិ', component: NewsPage },
               { name: 'dapnews', title: 'ដើមអម្ពិល', component: NewsPage },
               { name: 'kampucheathmey', title: 'កម្ពុជាថ្មី', component: NewsPage },
               { name: 'freshnews', title: 'Fresh News', component: NewsPage },
               { name: 'cen', title: 'CEN', component: NewsPage },
               { name: 'vod', title: 'VOD', component: NewsPage },
               { name: 'camnews', title: 'CamNews', component: NewsPage },
               ];
           }

           initializeApp() {
               this.platform.ready().then(() => {
                   StatusBar.styleDefault();
                   Splashscreen.hide();
                   this.push.register().then((t: PushToken) => {
                       return this.push.saveToken(t);
                   }).then((t: PushToken) => {
                       var deviceInfo = {
                       uuid: Device.device.uuid,
                       deviceToken: t.token,
                       appName: 'khmernews'
                       }
                       this.pushNotification.insert(deviceInfo).then(() => {
                           console.log(deviceInfo);
                           console.log('Token saved:', t.token);
                       });
                   });

                   this.push.rx.notification()
                       .subscribe((msg) => {
                           Dialogs.alert(msg.text, msg.title, 'Done').then(() => {
                               console.log('done alert');
                           });
                       });


                   // this.updateApp();

               });
           }

           openPage(page) {
               this.nav.setRoot(page.component, {
                   website: page.name,
                   websiteKh: page.title
               });
           }

           updateApp(){
               SpinnerDialog.show();
               this.deploy.check().then((snapshotAvailable) => {
                   SpinnerDialog.hide();
                   this.snapshotAvailable = snapshotAvailable;
                   if (this.snapshotAvailable == true){
                       Dialogs.confirm('តើអ្នកចង់ update ដែរទេ?', 'មាន update ថ្មី').then((index) => {
                           if (index == 1){
                               SpinnerDialog.show();
                               this.deploy.download().then(() => {
                                   this.deploy.extract().then(() => {
                                       SpinnerDialog.hide();
                                       return this.deploy.load();
                                   });
                               });
                           }
                       })
                   }
                   else{
                       Dialogs.alert('មិនមានអ្វីថ្មី', 'ត្រួតពិនិត្យរួចរាល់', 'Done').then(() => {
                           console.log('done alert');
                       });
                   }
               });
           }


}
