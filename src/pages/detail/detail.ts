import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {News} from '../../providers/news';
import {SafariViewController} from 'ionic-native';

@Component({
    templateUrl: 'detail.html',
    providers: [News]
})
export class DetailPage {

    result: any;
    title: any;
    pushId: any;
    customLocale: any = {};

    constructor(private navCtrl: NavController, private news: News, private navParams: NavParams) {
        var articleId = this.navParams.get('id');
        this.news.findOne(articleId).then((data) => {
            this.result = data;
        });
    }

    openLink(url){
        SafariViewController.isAvailable()
            .then(
                    (available: boolean) => {
                        if(available){

                            SafariViewController.show({
                                url: url,
                                hidden: false,
                                animated: false,
                                transition: 'curl',
                                enterReaderModeIfAvailable: true,
                                tintColor: '#275fbd'
                            })
                            .then(
                                    (result: any) => {
                                        if(result.event === 'opened') console.log('Opened');
                                        else if(result.event === 'loaded') console.log('Loaded');
                                        else if(result.event === 'closed') console.log('Closed');
                                    },
                                    (error: any) => {
                                        console.error(error);
                                        open(url, "_blank", "location=no");
                                    } 
                                 );

                        } else {
                            open(url, "_blank", "location=no");
                        }
                    }
        );
    }

    back(){
        this.navCtrl.pop();
    }
}
