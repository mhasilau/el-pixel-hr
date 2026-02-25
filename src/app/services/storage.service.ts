import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly formStorageKey = 'internshipApplicationForm';

  constructor(private fb: FormBuilder) {}

  saveForm(form: FormGroup): void {
    const formData = form.value;
    localStorage.setItem(this.formStorageKey, JSON.stringify(formData));
  }

  loadForm(form: FormGroup, updateAgeCallback: () => void): void {
    const savedData = localStorage.getItem(this.formStorageKey);
    if (!savedData) return;

    const formData = JSON.parse(savedData);

    if (formData['personal-info']) {
      const personalData = formData['personal-info'];
      form.get('personal-info')?.patchValue({
        firstName: personalData.firstName || '',
        lastName: personalData.lastName || '',
        birthDate: personalData.birthDate ? new Date(personalData.birthDate) : '',
        gender: personalData.gender || '',
        country: personalData.country || '',
        city: personalData.city || '',
      });
    }
    if (formData['contact-info']) {
      const contactData = formData['contact-info'];
      form.get('contact-info')?.patchValue({
        phone: contactData.phone || '',
        email: contactData.email || '',
        telegram: contactData.telegram || '',
      });
    }

    if (formData['education-info']) {
      const educationData = formData['education-info'];

      form.get('education-info')?.patchValue({
        education: educationData.education || '',
        about: educationData.about || '',
        internship_spec: educationData.internship_spec || '',
        englishLevel: educationData.englishLevel || '',
        skills: Array.isArray(educationData.skills) ? educationData.skills : [],
      });
    }

    if (formData['personal-info']?.birthDate) {
      updateAgeCallback();
    }
  }

  clearForm(): void {
    localStorage.removeItem(this.formStorageKey);
  }
}
