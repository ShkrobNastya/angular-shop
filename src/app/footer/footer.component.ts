import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService) {}

  feedbackForm: FormGroup;

  successMessage = {
    visible: false,
    message: '',
  };
  errorMessage = {
    visible: false,
    message: '',
  };

  ngOnInit(): void {
    this.feedbackForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const controls = this.feedbackForm.controls;
    const payload = {
      name: controls['name'].value,
      email: controls['email'].value,
      phone: controls['phone'].value,
      message: controls['message'].value,
    };

    this.dataStorageService.sendFeedbackMessage(payload).subscribe({
      next: (res: any) => {
        this.feedbackForm.reset();
        this.successMessage.visible = true;
        this.successMessage.message = res.message;

        setTimeout(() => {
          this.successMessage.visible = false;
        }, 5000);
      },
      error: (err) => {
        this.errorMessage.visible = true;
        this.errorMessage.message = err.error.message || 'Smth went wrong((';
        setTimeout(() => {
          this.errorMessage.visible = false;
        }, 5000);
      },
    });
  }
}
