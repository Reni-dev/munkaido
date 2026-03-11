import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-work',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './work.html',
  styleUrl: './work.css',
})
export class Work {
  builder = inject(FormBuilder)

  today = new Date().toISOString().split('T')[0]

  workTimeForm = this.builder.group({
    projectName: ['', [Validators.required, Validators.minLength(3),]],
    date: ['', [Validators.required]],
    workedHours: [0, [Validators.required, Validators.min(0.5), Validators.max(12)]],
    description: ['', [Validators.required, Validators.maxLength(30)]]
  })

  registerWork() {
    console.log('Munkaidő regisztrálása ...')
    console.log(this.workTimeForm.value)

    const { projectName, date, workedHours, description } = this.workTimeForm.value
    this.saved(
      projectName || '',
      date || '',
      workedHours || 0,
      description || ''
    )
  }

  saved(projectName: string, date: string, workedHours: number, description: string){
    Swal.fire({
      icon: 'success',
      iconColor: 'bisque',
      title: '<span style="color:brown">Munkaidő regisztrálva!</span>',
      html: `
        <b>Projekt:</b> ${projectName}<br>
        <b>Dátum:</b> ${date}<br>
        <b>Órák:</b> ${workedHours}<br>
        <b>Leírás:</b> ${description}
      `,
      showConfirmButton: false,
      timer: 3000
    })
  }
}
