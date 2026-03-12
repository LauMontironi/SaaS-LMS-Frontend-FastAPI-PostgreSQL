import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-trusted-brands',
  standalone: true,
  templateUrl: './trusted-brands.html',
  styleUrl: './trusted-brands.css'
})
export class TrustedBrands {
  brands = signal([
    'NovaTech',
    'BrightLabs',
    'SkillForge',
    'UpCore',
    'LearnSphere',
    'PixelWorks'
  ]);
}