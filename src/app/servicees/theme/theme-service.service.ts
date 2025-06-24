import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {
  private darkThemeClass = 'dark-theme';
  private localStorageKey = 'theme';

  constructor() {
    const savedTheme = localStorage.getItem(this.localStorageKey)
    if (savedTheme == 'dark'){
      this.enableDark();
    }else{
      this.enableLight();
    }
   }
   enableDark(){
    document.body.classList.add(this.darkThemeClass);
    localStorage.setItem(this.localStorageKey,'dark')
   }
   enableLight(){
    document.body.classList.remove(this.darkThemeClass);
    localStorage.setItem(this.localStorageKey,'light');
   }

   toggleTheme(){
    if(document.body.classList.contains(this.darkThemeClass)){
      this.enableLight()
    }else{
      this.enableDark();
    }
   }

   isDarkMode():boolean{
    return document.body.classList.contains(this.darkThemeClass)
   }
  

}
