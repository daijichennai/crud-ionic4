import { Component, OnInit } from '@angular/core';
import { LoginI } from '../models/login.interface';
import { LoginService } from '../services/login.service';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  objs: LoginI[];
  constructor(private loginService: LoginService, public firestore: AngularFirestore) { }

  ngOnInit() {
    // this.loginService.getLogin().subscribe((result) => {
    //   this.objs = result;
    //   console.log('ask = ', result);
    // });

      // this.loginService.chkUser('admin@gmail.com').subscribe((result) => {
      //   console.log(result);
      // });

    this.loginService.chkUser('admin').subscribe(result => {
      console.log(result);
    });

    let addNewUser = this.firestore.doc<any>('loginMaster/user');
    this.firestore.doc<any>('loginMaster/user');
    addNewUser.set({
      userEmail: 'user@user.com',
      userIsActive: true,
      userName: 'User',
      userPwd: '12345678',
      userRole: 'user'
    });


  }
}
