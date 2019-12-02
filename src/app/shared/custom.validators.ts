import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  
  // Synchronous validators doesn't works well

  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return {
        cannotContainSpace: true
      };
    }
    return null;
  }

  static cannotContainNumber(control: AbstractControl): ValidationErrors | null {
    for (let i = 0; i < (control.value as string).length; i++) {
      if (! ( (control.value[i] >= 65 && control.value[i] <= 90) ||
              (control.value[i] >= 97 && control.value[i] <= 122) )
      ) {
        return {
          cannotContainNumber: true
        };
      }
    }
    return null;
  }

  static containsOnlyNumber(control: AbstractControl): ValidationErrors | null {
    for (let i = 0; i < (control.value as string).length; i++) {
      if(! (control.value[i] >= 48 && control.value[i] <= 57)) {
        return {
          containsOnlyNumber: true
        };
      }
    }
    return null;
  }

  // Asynchronous: should be fixed

  // static shouldBeUnique(control: AbstractControl): Promise < ValidationErrors | null > {
  //   return new Promise ((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === 'ibrahim') {
  //         resolve({shouldBeUnique: true});
  //       } else {
  //         resolve(null);
  //       }
  //     }, 2000);
  //   });
  // }
}
