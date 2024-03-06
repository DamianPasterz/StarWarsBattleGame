import { Component } from '@angular/core';
import { PeopleFacade } from '@state/people';
import { PlanetsFacade } from '@state/planets';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
})
export class PlanetsComponent {
  constructor(
    private planetsFacade: PlanetsFacade,
    private peopleFacade: PeopleFacade
  ) {}
}
