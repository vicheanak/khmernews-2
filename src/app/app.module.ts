import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import {NewsPage} from '../pages/news/news';
import {DetailPage} from '../pages/detail/detail';
import { CloudSettings, CloudModule} from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '9ee12683'
  },
  'push': {
      'sender_id': '242004580343',
      'pluginConfig': {
          'ios': {
              'badge': true,
              'sound': true
          },
          'android': {
              'iconColor': '#343434'
          }
      }
  }
};

@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    DetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    DetailPage
  ],
  providers: []
})
export class AppModule {}
