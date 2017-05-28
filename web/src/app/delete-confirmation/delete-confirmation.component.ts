import { Component, Input, OnInit } from '@angular/core';
import { MzBaseModal, MzModalComponent, MzModalService } from 'ng2-materialize';

@Component({
  selector: 'delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.less']
})
export class DeleteConfirmationComponent extends MzBaseModal {

  deletionConfirmed: boolean
  @Input() name: String
  @Input() message: String

  constructor() {
    super()
  }

  ngOnInit() {
  }

  close() {
    this.modalComponent.close()
  }
}
