import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";
import { Subscription } from "rxjs/index";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;

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
        // Теперь вы можете зайти в систему используя свои данные
      } else if (params['accessDenied']) {
        // Для начала овтаризируйтесь в системе
      }
    })
  }

  onSubmit() {
    this.form.disable();
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/overview']);
        console.log('login success')
      },
      (error) => {
        console.warn(error);
        this.form.enable();
      }
    )
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
