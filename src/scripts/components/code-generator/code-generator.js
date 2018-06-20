'use strict'
import QuickSettings from 'quicksettings';
import Manual from './manual';

import {select, create, selectText, throttleEvents} from '../../utils/trix-utils';

export default class CodeGenerator{
    constructor(){
        this.build();
        this.setupSettings();
        this.updateHTML();
        this.updateCode();
    }
    build(){
/*         this.cf = {
            Farve:'#cc380d',
            // Spørgsmål:'Hvad er meningen med livet, universet og det hele?',
            Min:'-100',
            Max:'100',
            Svar:'42',
            Start:'0',
            Step:'1',
            Decimaler:'0',
            Enhed:'',
            Feedback:'Det kan godt være svært at sætte et tal på, men vi ved heldigvis fra ”The Hitchhikers Guide to the Galaxy“ at svaret er 42.',
            Kilde:'Douglas Adams',
            Script:'https://www.dr.dk/tjenester/visuel/simple-survey-slider/default/drn-main.bundle.js'
        };
 */        
        this.defaultContent = {
            Farve:'#cc380d',
            Spørgsmål:'Her er spørgsmålet',
            Min:'0',
            Max:'100',
            Svar:'75',
            Start:'50',
            Step:'1',
            Decimaler:'0',
            Enhed:'%',
            Feedback:'Her er den uddybende forklaring',
            Kilde:'Navn',
            Script:'https://www.dr.dk/tjenester/visuel/simple-survey-slider/default/drn-main.bundle.js'
        };

        this.htmlContainer = create('div', select('body'), 'html-container');
        this.htmlFrame = create('iframe', this.htmlContainer, 'html-frame');
        // this.htmlFrame.setAttribute('scrolling', 'no');
        this.codeContainer = create('div', select('body'), 'code-container');
        this.codeContainer.setAttribute('contenteditable', '');
        this.emptyContainer = create('div', select('body'), 'empty-container');
        this.emptyContainer.innerText = 'Hello';
        
        this.codeContainer.addEventListener('input', throttleEvents(()=>{
            console.log('input');
            this.analyzeCode();
            // selectText('.code-container');
        }, 500));

    }
    setupSettings(){
        //console.log('ls:', localStorage.getItem('lsTest'));
        let standardColors = {
            Nyheder:'#cc380d',
            Sporten:'#ffd200',
            Politik:'#147a89',
            Kontant:'#0861ce'
        }
        QuickSettings.useExtStyleSheet();
        let manual = new Manual();
        this.settings = QuickSettings.create(10, 10, 'Indstillinger', select('body'));
        // let s = this.settings;
        //this.settings = this.settings;
        this.settings.addButton('?', ()=>{
            manual.toggleVisibility();
        })
        this.settings.addButton('Opdater', ()=>{
            this.updateHTML();
            this.updateCode();
            this.saveSettings();
        });
        this.settings.addButton('Kopier kode', ()=>{
            this.codeContainer.classList.add('select-styled');
            selectText('.code-container');
            document.execCommand('copy');
            this.codeContainer.classList.remove('select-styled');
            selectText('.empty-container');
        });
        this.settings.addButton('Nulstil', ()=>{
           let c = confirm('Er du sikker på, at du vil nulstille? Alle felter udfyldes med dummy tekst og værdier og det kan ikke efterfølgende fortrydes.');
           if(c){
                this.resetContent();
           }
        });
        //s.addTextArea('Spørgsmål');
        this.settings.addText('Farve', '#cc380d');
        this.settings.addDropDown('StandardFarver', ['Nyheder', 'Sporten', 'Politik', 'Kontant'], (item)=>{
            // console.log(item);
            this.settings.setValue('Farve', standardColors[item.value]);
            this.updateHTML();
            this.updateCode();
        });
        this.settings.addTextArea('Spørgsmål', 'Hvad er meningen med livet, universet og det hele?', (value)=>{
            //this.cf.Spørgsmål = value;
        });
        this.settings.addTextArea('Feedback', 'Det kan godt være svært at sætte et tal på, men vi ved heldigvis fra ”The Hitchhikers Guide to the Galaxy“ at svaret er 42.');
        this.settings.addText('Kilde', 'Douglas Adams');
        this.settings.addText('Min', '-100');
        this.settings.addText('Max', '100');
        this.settings.addText('Svar', '42');
        this.settings.addText('Start', '0');
        this.settings.addText('Step', '1');
        this.settings.addText('Decimaler', '0');
        this.settings.addText('Enhed', '');
        this.settings.addText('Script', 'https://www.dr.dk/tjenester/visuel/simple-survey-slider/default/drn-main.bundle.js');
        
        this.settings.setTextAreaRows('Spørgsmål', 3);
        this.settings.setTextAreaRows('Feedback', 5);
        
        //this.settings.saveInLocalStorage('simpleSliderSettings');
        let ls = localStorage.getItem('lsTest');
        if(ls){
            this.settings.setValuesFromJSON(ls);
        }
        //console.log('ls:', localStorage.getItem('lsTest'));
        
    }
    resetContent(){
        console.log('reset');
        this.settings.setValuesFromJSON(this.defaultContent);
        this.updateCode();
        this.updateHTML();
        this.saveSettings();
    }
    saveSettings(){
        localStorage.setItem('lsTest', this.settings.getValuesAsJSON(true));
    }
    html(){
        let h = `<div data-survey-slider data-min="${this.settings.getValue('Min')}" data-max="${this.settings.getValue('Max')}" data-color="${this.settings.getValue('Farve')}" data-answer="${this.settings.getValue('Svar')}" data-unit="${this.settings.getValue('Enhed')}" data-step="${this.settings.getValue('Step')}" data-start="${this.settings.getValue('Start')}" data-resultprecision="${this.settings.getValue('Decimaler')}" data-question="${this.settings.getValue('Spørgsmål')}" data-source="${this.settings.getValue('Kilde')}" data-feedback="${this.settings.getValue('Feedback')}"></div>
        <script src="${this.settings.getValue('Script')}"></script>
        `;
        return h;
    }
    framehtml(){
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Preview</title>
            <style>
            body {
                background: #FFF;
                margin: 20px;
                padding: 0px;
                font-family: gibsonRegular;
            }
            @font-face{
                font-family:"gibsonRegular";
                src:url("https://www.dr.dk/assets/fonts/gibson/regular/gibson-regular-webfont.woff2") format("woff2"),
                url("https://www.dr.dk/assets/fonts/gibson/regular/gibson-regular-webfont.woff") format("woff");
               font-weight:normal;
              }
              @font-face{
                font-family:"gibsonSemiBold";
                src:url("https://www.dr.dk/assets/fonts/gibson/semiBold/gibson-semiBold-webfont.woff2") format("woff2"),
                url("https://www.dr.dk/assets/fonts/gibson/semiBold/gibson-semiBold-webfont.woff") format("woff");
                font-weight:normal}
              
            </style>
        </head>
        <body>
            ${this.html()}
        </body>
        </html>`;
    }
    updateCode(){
        this.codeContainer.innerText = this.html();
    }
    updateHTML(){
        this.htmlFrame.srcdoc = this.framehtml();
    }
    analyzeCode(){
        console.log('analyze');
        let t = this.codeContainer.innerText;
        
        function grabValue(attribute){
            let string = attribute+'="';
            let subToEnd = t.substr(t.indexOf(string)+string.length);
            let value = subToEnd.substr(0, subToEnd.indexOf('"'));
            return value;
        }

        let color = grabValue('data-color');
        let question = grabValue('data-question');
        let min = grabValue('data-min');
        let max = grabValue('data-max');
        let answer = grabValue('data-answer');
        let start = grabValue('data-start');
        let step = grabValue('data-step');
        let precision = grabValue('data-resultprecision');
        let unit = grabValue('data-unit');
        let feedback = grabValue('data-feedback');
        let source = grabValue('data-source');
        let script = grabValue('script src');

        this.settings.setValue('Farve', color);
        this.settings.setValue('Spørgsmål', question);
        this.settings.setValue('Min', min);
        this.settings.setValue('Max', max);
        this.settings.setValue('Svar', answer);
        this.settings.setValue('Start', start);
        this.settings.setValue('Step', step);
        this.settings.setValue('Decimaler', precision);
        this.settings.setValue('Enhed', unit);
        this.settings.setValue('Feedback', feedback);
        this.settings.setValue('Kilde', source);
        this.settings.setValue('Script', script);

/* 
        console.log('Farve', color);
        console.log('Spørgsmål', question);
        console.log('Min', min);
        console.log('Max', max);
        console.log('Svar', answer);
        console.log('Start', start);
        console.log('Step', step);
        console.log('Decimaler', precision);
        console.log('Enhed', unit);
        console.log('Feedback', feedback);
        console.log('Kilde', source);
        console.log('Script', script);
 */        
        this.updateHTML();
    }

}