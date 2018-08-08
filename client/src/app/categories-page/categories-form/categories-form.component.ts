import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoriesService } from "../../shared/services/categories.service";
import { switchMap } from "rxjs/operators";
import { filter } from "rxjs/operators";
import { MaterialService } from "../../shared/classes/material.service";
import { tap } from "rxjs/internal/operators";
import { Category } from "../../shared/interfaces";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isNew = true;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({name: [null, [Validators.required]]});

    // this.form.disable();
    this.route.params.pipe(
      filter((params: Params) => params['id'] !== undefined),
      tap(() => this.form.disable()),
      switchMap((param) => this.categoriesService.getCategoryById(param.id)),
      tap(() => {
        this.isNew = false;
        this.form.enable();
      }),
    ).subscribe(
      (category: Category) => {
        this.updateInput({name: category.name});
      },
      ({error}) => MaterialService.toast(error.message)
    );
  }

  updateInput(condition) {
    this.form.patchValue(condition);
    MaterialService.updateTextInputs();
  }

  onSubmit() {

  }

}
