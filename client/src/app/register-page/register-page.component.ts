import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs/index";
import { AuthService } from "../shared/services/auth.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public authSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.form.disable();
    this.authSub = this.auth.register(this.form.value)
      .subscribe(
        () => {
          this.router.navigate(['/login'], {
            queryParams: {registered: true}
          });
        },
        (error) => {
          console.warn(error);
          this.form.enable();
        }
      );
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

}
