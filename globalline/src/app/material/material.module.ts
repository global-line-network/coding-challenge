
import { NgModule } from '@angular/core';

import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, 
        MatSnackBarModule, MatGridListModule, MatIconModule, MatDialogModule } from '@angular/material';

const MaterialCompoents = [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule
]

@NgModule({
    imports: [ MaterialCompoents ],
    exports: [ MaterialCompoents ]
})
export class MaterialModule {}