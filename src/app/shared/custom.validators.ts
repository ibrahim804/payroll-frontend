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

  static containsOnlyAlphabet(control: AbstractControl): ValidationErrors | null {
    for (let i = 0; i < (control.value as string).length; i++) {
      const condition = (control.value[i] >= 'A' && control.value[i] <= 'Z') ||
                        (control.value[i] >= 'a' && control.value[i] <= 'z') ||
                         control.value[i] === ' ' ? true : false;
      if (! condition) {
        return {
          containsOnlyAlphabet: true
        };
      }
    }
    return null;
  }

  static containsOnlyNumber(control: AbstractControl): ValidationErrors | null {
    for (let i = 0; i < (control.value as string).length; i++) {
      if (! (control.value[i] >= '0' && control.value[i] <= '9')) {
        return {
          containsOnlyNumber: true
        };
      }
    }
    return null;
  }

  static containsDecimalNumber(control: AbstractControl): ValidationErrors | null {
    for (let i = 0; i < (control.value as string).length; i++) {
      if (! ((control.value[i] >= '0' && control.value[i] <= '9') || control.value[i] === '.' ) ) {
        return {
          containsDecimalNumber: true
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
