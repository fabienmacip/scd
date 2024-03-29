import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Recette } from 'src/app/interfaces/recette';
import { RecettesService } from 'src/app/services/recettes.service';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit, OnDestroy {

  recetteForm!: FormGroup;

  recettes: Recette[] = [];

  currentRecette: any;

  subscription! : Subscription;

  currentRecettePhotoFile!: any;
  currentRecettePhotoUrl! : string;

  constructor(
    private formBuilder: FormBuilder,
    private recettesService: RecettesService
  ) { }

  ngOnInit(): void {
    this.initRecetteForm();

    this.subscription = this.recettesService.recettesSubject.subscribe({
      next: (recettes: Recette[]) => {
        this.recettes = recettes;
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.recettesService.getRecettes();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initRecetteForm(): void{
    this.recetteForm = this.formBuilder.group({
      id: [null],
      title: ['Purée de pois-chiches', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      photo:[],
      description: ['lorem ipsum dolor...',[Validators.required, Validators.maxLength(200)]],
      preparationTime: [25,[Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      breakTime: [30,[Validators.maxLength(3)]],
      cookingTime: [5,[Validators.maxLength(3)]],
      ingredients: ['200 g de pois-chiches, 3 cuillères d\'huile, 1 pincée de sel',[Validators.maxLength(300)]],
      steps: ['1. Hacher les pois-chiches // 2. Ajouter l\'huile et le sel // 3. Mélanger',[Validators.maxLength(2000)]],
      /* allergens: ['aucun',[Validators.maxLength(150)]],
      diets: ['vegan, végétarien, végétalien, protéiné', [Validators.maxLength(150)]], */
      allergenCacao: [''],
      allergenLait: [''],
      allergenCacahuete: [''],
      allergenGluten: [''],
      dietNormal: [''],
      dietVegan: [''],
      dietVegetarien: [''],
      dietPaleo: [''],
      dietDiabete: [''],
      dietProteine: [''],
      patientsOnlyCheck: [false]
    })
  }

  onChangePhotoFile($event: any): void{
    this.currentRecettePhotoFile = $event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.currentRecettePhotoFile);
    fileReader.onloadend = (e) => {
      this.currentRecettePhotoUrl = <string>e.target?.result;
    }
  }

  onEditRecette(recette: Recette): void{
    this.currentRecettePhotoUrl = recette.photo ?? '';
    this.recetteForm.setValue({
      id: recette.id ?? '',
      title : recette.title ?? '',
      photo: '',
      description: recette.description ?? '',
      preparationTime: recette.preparationTime ?? 0,
      breakTime : recette.breakTime ?? 0,
      cookingTime: recette.cookingTime ?? 0,
      ingredients: recette.ingredients ?? '',
      steps : recette.steps ?? '',
      allergenCacao : recette.allergenCacao ?? false,
      allergenLait : recette.allergenLait ?? false,
      allergenCacahuete : recette.allergenCacahuete ?? false,
      allergenGluten : recette.allergenGluten ?? false,
      dietNormal : recette.dietNormal ?? false,
      dietVegan : recette.dietVegan ?? false,
      dietVegetarien : recette.dietVegetarien ?? false,
      dietPaleo : recette.dietPaleo ?? false,
      dietDiabete : recette.dietDiabete ?? false,
      dietProteine : recette.dietProteine ?? false,
      patientsOnlyCheck: recette.patientsOnlyCheck ?? false
    });
  }

  onSubmitRecetteForm(): void{
    const recetteId = this.recetteForm.value.id;
    let recette = this.recetteForm.value;
    const recettePhotoUrl = this.recettes.find(el => el.id === recetteId)?.photo;
    recette = {...recette, photo: recettePhotoUrl};
    if(!recetteId || recetteId && recetteId === ''){
      // CREATION
      delete recette.id;
      this.recettesService.createRecette(recette, this.currentRecettePhotoFile).catch(console.error);
    } else {
      // MODIFICATION
      delete recette.id;
      this.recettesService.editRecette(recette, recetteId, this.currentRecettePhotoFile).catch(console.error);
    }
    this.recetteForm.reset();
    this.currentRecettePhotoFile = null;
    this.currentRecettePhotoUrl = '';
  }

  onDeleteRecette(recetteId?: string): void{
    if(recetteId){
      this.recettesService.deleteRecette(recetteId).catch(console.error);
    } else {
      console.error('Un id doit être fourni pour pouvoir supprimer cette recette.');
    }
  }


}
