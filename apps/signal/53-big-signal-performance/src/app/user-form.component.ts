import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserStore } from './user.service';

@Component({
  selector: 'user-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="flex flex-col gap-4">
      <div>
        Name:
        <input
          class="rounded-md border border-gray-400"
          formControlName="name" />
      </div>
      <div>
        Address:
        <div>
          street:
          <input
            class="rounded-md border border-gray-400"
            formControlName="street" />
        </div>
        <div>
          zipCode:
          <input
            class="rounded-md border border-gray-400"
            formControlName="zipCode" />
        </div>
        <div>
          city:
          <input
            class="rounded-md border border-gray-400"
            formControlName="city" />
        </div>
      </div>
      <div>
        note:
        <input
          class="rounded-md border border-gray-400"
          formControlName="note" />
      </div>
      <div>
        title:
        <input
          class="rounded-md border border-gray-400"
          formControlName="title" />
      </div>
      <div>
        salary:
        <input
          class="rounded-md border border-gray-400"
          formControlName="salary" />
      </div>
      <button class="w-fit border p-2">Submit</button>
    </form>
  `,
  host: {
    class: 'block border border-gray-500 p-4 pt-10 m-4',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  userStore = inject(UserStore);

  form = new FormGroup({
    name: new FormControl(this.userStore.userName(), { nonNullable: true }),
    street: new FormControl(this.userStore.userAddress().street, {
      nonNullable: true,
    }),
    zipCode: new FormControl(this.userStore.userAddress().zipCode, {
      nonNullable: true,
    }),
    city: new FormControl(this.userStore.userAddress().city, {
      nonNullable: true,
    }),
    note: new FormControl(this.userStore.userNote(), { nonNullable: true }),
    title: new FormControl(this.userStore.userJobInfo().title, {
      nonNullable: true,
    }),
    salary: new FormControl(this.userStore.userJobInfo().salary, {
      nonNullable: true,
    }),
  });

  protected readonly formControls = this.form.controls;

  submit(): void {
    const formRawValue = this.form.getRawValue();
    this.userStore.userName.set(formRawValue.name);

    if (
      this.formControls.street.touched ||
      this.formControls.zipCode.touched ||
      this.formControls.city.touched
    ) {
      this.userStore.setUserAddress(
        formRawValue.street,
        formRawValue.zipCode,
        formRawValue.city,
      );
    }

    if (this.formControls.title.touched || this.formControls.salary.touched) {
      this.userStore.setUserJobInfo(formRawValue.title, formRawValue.salary);
    }

    this.userStore.userNote.set(formRawValue.note);
  }
}
