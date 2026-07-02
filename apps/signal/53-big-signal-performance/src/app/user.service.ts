//rxjs signal store wasn't available in the project

import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStore {
  userName = signal('Bob');
  userAddress = signal({
    street: '',
    zipCode: '',
    city: '',
  });
  userJobInfo = signal({
    title: '',
    salary: 0,
  });
  userNote = signal('');

  setUserAddress(newStreet: string, newZipCode: string, newCity: string) {
    this.userAddress.set({
      street: newStreet,
      zipCode: newZipCode,
      city: newCity,
    });
  }

  setUserJobInfo(newTitle: string, newSalary: number): void {
    this.userJobInfo.set({ title: newTitle, salary: newSalary });
  }
}
