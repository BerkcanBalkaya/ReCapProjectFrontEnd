import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable()
export class SanitizerService {

  constructor(private sanitizer:DomSanitizer) { }

  sanitizeUrl(Url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(Url);
  }
}
