import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { User } from '../services/vos/user';
import { CaseService } from '../services/case.service';
import { UtilService } from '../services/util.service';
import { State } from '../edit-case/constants';
import { AngularFireAuth } from '@angular/fire/auth';
import { CommentVO } from '../services/vos/comment';

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.page.html',
  styleUrls: ['./add-comments.page.scss'],
})
export class AddCommentsPage implements OnInit {

  private caseVo:any;
  commentForm: FormGroup;
  comments:any;
  currentuser:any;
  constructor(private afAuth:AngularFireAuth,
    private util:UtilService,private caseService:CaseService,private route: ActivatedRoute,private router:Router, private fb: FormBuilder,private dataService:DataService) { }

  ngOnInit() {
    this.createForm();
    if (this.route.snapshot.data['special']) 
    {
      this.caseVo = this.route.snapshot.data['special'];
      this.caseService.listComment(this.caseVo.id).subscribe(data =>{
        this.comments = data;
      })
      
      this.dataService.getLocalData(this.afAuth.auth.currentUser.email).then(val =>{
      
        this.currentuser = new User(val.firstname,val.lastname,val.emailid,val.role);
      });
    }
  }

  public createForm()
  {
    this.commentForm = this.fb.group({
      comment: [null, Validators.required],
    })
  }

  public onSubmit(value) {
    
    if (this.commentForm.valid) {
      
      let comment:any = {};
      comment.createdate = new Date().getTime();
      comment.user = this.currentuser.firstname + " " + this.currentuser.lastname;
      comment.comments = value.comment;
      comment.role = this.currentuser.role;
      
      if(!this.comments)
      {
          this.comments = [];
      }
   
      this.caseService.addComments(this.caseVo.id,comment).then(val =>{
        this.util.presentAlert("Comments added succesfully");  
        this.comments.push(comment);    
      }).catch(err =>{
        this.util.presentAlert("Comments were not added");      
      })
      
     
      


    }

    
  }

  public canShow()
  {
    if(this.caseVo.status != State.Closed && this.caseVo.status != State.Rejected)
    {
        return true;
    }
    return false;
  }

  getActualDate(millis)
  {
    let date = new Date(millis);  
    return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date. getFullYear());
  }

}
