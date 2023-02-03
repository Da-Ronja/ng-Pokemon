import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent implements OnInit {

  @Input() pokemonName: string = "";

constructor() { }

ngOnInit(): void { }

onCatch(): void {
  // add to trainer

  alert("You catch " + this.pokemonName + " pokemon!")
}

}
