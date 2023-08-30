import {
  FormArray, FormControl,
} from '@angular/forms';

export class ArticleVenteValidator {
  static validArticleArrayItems(control: FormArray) {
    const firstThree = control.controls.slice(0, 3);

    const containsFil = firstThree.some(
      (item) => item.get('libelle').value === 'fil'
    );
    const containsBoutons = firstThree.some(
      (item) => item.get('libelle').value === 'boutons'
    );
    const containsTissus = firstThree.some(
      (item) => item.get('libelle').value === 'tissus'
    );

    if (!containsFil || !containsBoutons || !containsTissus) {
      return {
        saPasse: true,
      };
    }

    return null;
  }
}
