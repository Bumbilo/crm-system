import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";
import { Subscription } from "rxjs/index";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public authSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Теперь вы можете зайти в систему используя свои данные');
      } else if (params['accessDenied']) {
        MaterialService.toast('Для начала овтаризируйтесь в системе');
      } else if (params['sessionFailed']) {
        MaterialService.toast('Пожалуйста войдите в систему заного');
      }
    })
  }

  onSubmit(): void {
    this.form.disable();
    this.authSub = this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/overview']);
        console.log('login success')
      },
      ({ error }) => {
        MaterialService.toast(error.message);
        this.form.enable();
      }
    )
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
