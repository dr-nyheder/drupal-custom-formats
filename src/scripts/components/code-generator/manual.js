'use strict'
import Quicksettings from 'quicksettings';
import {select} from '../../utils/trix-utils';

export default class Manual{
    constructor(){
        this.setupDesriptions();
        this.build();
        return this.panel;
    }
    build(){
        let man = Quicksettings.create(180, 10, 'Guide', select('body'));
        man.setWidth(240);
        man.addButton('Luk', ()=>{
            man.hide();
        })
        // man.addHTML('Intro', this.description.Intro);
        man.addHTML('Forklaring', this.cookSomeHTML(this.description.Intro));
        man.addButton('Opdater', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Opdater));
        });
        man.addButton('Kopier Kode', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Kopier));
        });
        man.addButton('Nulstil', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Nulstil));
        });
        man.addButton('Farve', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Farve));
        });
        man.addButton('Standard Farver', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.StandardFarver));
        });
        man.addButton('Spørgsmål', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Spørgsmål));
        });
        man.addButton('Feedback', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Feedback));
        });
        man.addButton('Kilde', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Kilde));
        });
        man.addButton('Min', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Min));
        });
        man.addButton('Max', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Max));
        });
        man.addButton('Svar', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Svar));
        });
        man.addButton('Start', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Start));
        });
        man.addButton('Step', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Step));
        });
        man.addButton('Decimaler', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Decimaler));
        });
        man.addButton('Enhed', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Enhed));
        });
        man.addButton('Script', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Script));
        });
        man.addButton('Vis start tekst', ()=>{
            man.setValue('Forklaring', this.cookSomeHTML(this.description.Intro));
        });
        man.hideTitle('Forklaring');
        man.hide();
        this.panel = man;
    }
    cookSomeHTML(text){
        return `<div style="background:#FFFFFF;font-size:11px;padding:10px;">${text}</div>
        `;
    }
    setupDesriptions(){
        this.description = {
            Intro:'Her kan du lave embed koden til en <strong>Simple Slider</strong> til dr.dk<br/><br/>I panelet til venstre kan du indstille inholdet, farven og værdierne.<br/><br/>Hvis du har koden fra en eksisterende Slider, kan du kopiere og sætte den ind i kodefeltet under previewet. Så bliver indstillingerne taget derfra og du kan nemt justere eller sætte nyt indhold i. <br/><br/>Du kan også rette direkte i koden i stedet for at bruge panelet, hvis du har lyst og mod på det.<br/><br/>Klik på knapperne herunder, for at få en forklaring på de enkelte elementer i panelet.',
            Opdater:'Opdaterer både <strong>preview</strong> og <strong>kode</strong> med de rettelser man har lavet i <strong>Indtillings panelet.</strong><br/><br/>Virker som en slags <strong>genindlæs</strong> funktion for previewet.<br/><br/>Samtidig bliver indholdet gemt lokalt i den browser du bruger, så hvis du kommer til at lukke vinduet, eller genindlæse siden, skal du ikke starte forfra.',
            Kopier:'Kopierer <strong>koden</strong> til dit clipboard, så den kan sættes direkte ind i en kodeboks komponent i <strong>Drupal</strong>, eller i en <strong>webdok</strong> artikel.',
            Nulstil:'Nulstiller indholdet i alle felter og udfylder dem med dummy tekst og værdier.',
            Farve:'Her kan du indsætte en <strong>hexadecimal farvekode</strong>, der bruges både til den runde knap og gæt knappen, når den bliver aktiv.',
            StandardFarver:'Her kan du i stedet vælge mellem forskellige <strong>standard farver</strong> på dr.dk<br/><br/><i><strong>NB:</strong> Listen er ikke komplet endnu</i>',
            Spørgsmål:'Det er naturligvis <strong>spørgsmålet</strong>, der kan redigeres her.',
            Feedback:'Her indsættes den uddybende tekst, der vises efter brugeren har gættet.',
            Kilde:'Sammen med den uddybende tekst vises teksten: <strong>”Kilde:“</strong> efterfulgt af kilde angivelsen i dette felt. Hvis feltet er tomt, vises det ikke.',
            Min:'Her sættes sliderens <strong>minimum </strong>værdi - altså det mindste brugeren kan gætte på. Der kan godt arbejdes med negative tal.<br/><br/>Decimaler angives med punktum.',
            Max:'Her sættes sliderens <strong>maximum </strong>værdi - altså det højeste brugeren kan gætte på. Det kan godt være et negativt tal, men det skal være højere end Minimum.<br/><br/>Decimaler angives med punktum.',
            Svar:'Her sættes den rigtige værdi, med andre ord: <strong>svaret på spørgsmålet.</strong><br/><br/>Decimaler angives med punktum.',
            Start:'Her vælger man hvor på skalaen mellem minimum og maximum, slideren skal stå som udgangspunkt. Hvis feltet er tomt, starter den automatisk i midten.<br/><br/>Decimaler angives med punktum.',
            Step:'Her sættes størrelse på de trin slideren hopper når den trækkes. Har man f.eks. min 0 og max 100 og sætter step 10, vil den springe fra 0 til 10, 20, 30 osv.<br/><br/>Vær opmærsom på at selvom det er en god idé at sætte en høj værdi, hvis man har et langt spænd mellem min og max, kan man her gøre det umuligt at ramme det rigtige svar. Det samme gælder hvis man sætter en en meget lille værdi til et stort spænd og brugeren har en lille mobil skærm.<br/><br/>Værdien kan godt sættes med decimaler (f.eks. 0.1), men så skal der stå et tal højere end 0 i feltet <strong>Decimaler.</strong><br/><br/>Decimaler angives med punktum.',
            Decimaler:'Angiver hvor mange decimaler der bruges. Gælder både brugerens gæt og det rigtige svar. <br/><br/>Hvis man sætter værdien til 0, rundes alle værdier op til heltal. Ønsker man at bruge decimaler, skal der altså være en værdi højere end 0 her foruden at der skal angives en decimal værdi i <strong>Step</strong> feltet.',
            Enhed:'Her kan man skrive en enheds angivelse, der vises efter tallene i slideren. Det kan f.eks. være <strong>%</strong> - <strong>°C</strong> - <strong>kilometer</strong>- <strong>kopper kaffe</strong> osv.<br/><br/> Enheden vises efter både min og max, såvel som gættet og det rigtige svar.',
            Script:'Angiver stien til det script slideren bygges af. Skal kun ændres, hvis der er produceret en special variant.'
            
        }
        
    }
}