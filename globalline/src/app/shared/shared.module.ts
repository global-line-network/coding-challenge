import { NgModule } from '@angular/core';

import { ConfirmationDialogComponent } from './confirmationDialog/confirmationDialog.component';
import { MaterialModule } from '../material/material.module';

@NgModule({

    declarations: [
        ConfirmationDialogComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ],
    imports: [
        MaterialModule
    ]

})

export class SharedModule {}