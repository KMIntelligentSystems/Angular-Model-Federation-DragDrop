import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
} from '../drag-events';
import {moveItemInArray, transferArrayItem} from '../drag-utils';

@Component({
  selector: 'app-test-drag-drop',
  templateUrl: './test-drag-drop.component.html',
  styleUrls: ['./test-drag-drop.component.css']
})
export class TestDragDropComponent implements OnInit {

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep',
    'Walk Dog',
    'Stretch',
    'Code Stuff',
    'Drag Stuff',
    'Drop Stuff',
    'Run',
    'Walk'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

 drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
 

  constructor() { }

  ngOnInit(): void {
  }

}
