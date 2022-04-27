import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Series } from '../model/series';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  series: any = [];
  serie = new Series();

  isVisible: boolean = false;

  seriesForm = new FormGroup({
    name: new FormControl(),
    genre: new FormControl(),
    published: new FormControl()
  });

  searchForm = new FormGroup({
    searchname: new FormControl()
  });

  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService
  ) {
    this.getSeries();
  }

  ngOnInit(): void {

  }

  getSeries () {
    this.appService.getSeries().subscribe((data)=>{
      this.series = data;
    })
  }

  onAddPost(){
    
    this.appService.getSeries().subscribe((data)=> {
      this.series = data as Series[];

      for(this.serie of this.series) {
        if(this.serie.name === this.seriesForm.value.name){
          alert("van ilyen");
          return;
        }
      }

    var name = (document.getElementById('name-input') as HTMLInputElement).value;
    var genre = (document.getElementById('genre-input') as HTMLInputElement).value;
    var published = (document.getElementById('published-input') as HTMLInputElement).value;
    //this.seriesForm.controls['name'].value

    if(name === '' || genre === '' || published === ''){
      alert("Tölts ki minden adatot!");
      return;
    }

    this.serie.name = name;
    this.serie.genre = genre;
    this.serie.published = +published;

    this.appService.createrSerie(this.serie).subscribe(data => this.serie);
    this.onClose();

    this.router.navigate(['series']).then(() => {window.location.reload();});
      
    })
  }

  onClose(){
    this.isVisible = false;
  }

  onOpen(){
    this.isVisible = true;
  }

  onDeleteSerie(id: any){
    console.log("fdgd");
    this.appService.deleteSeries(id).subscribe(()=>{
      this.router.navigate(['series']).then(() => {window.location.reload();});
    });
  }

  isWatch(id: any){

    for(this.serie of this.series) {
      if(this.serie._id === id){
        if(this.serie.seen === 1){
          this.appService.setunSeen(id).subscribe(()=>{
            this.router.navigate(['series']).then(() => {window.location.reload();});
          });
        }else{
          this.appService.setSeen(id).subscribe(()=>{
            this.router.navigate(['series']).then(() => {window.location.reload();});
          });
        }
      }
    }
  }

}
