'use strict'

import CSS from './styles';
import {select, create, selectText, throttleEvents} from '../../utils/trix-utils';

export default class CodeGenerator{
    constructor(){
        this.build();
        this.setupSettings();
        this.updateHTML();
        this.updateCode();
    }
    build(){
        
        this.defaultContent = {
            from:'Afsender',
            to:'Modtager',
            subject:'Her står emnet',
            date:'Tordag 21. Juni 2018, 16.45',
            content:'Her er mailens indhold. <br/><br/>Med venlig hilsen<br/>Afsender',
        };

        this.content = {
            from:'',
            to:'',
            subject:'',
            date:this.defaultContent.date,
            content:this.defaultContent.content
        };

        this.htmlContainer = create('div', select('body'), 'html-container');
        this.htmlFrame = create('iframe', this.htmlContainer, 'html-frame');
        // this.htmlFrame.setAttribute('scrolling', 'no');
        this.codeContainer = create('div', select('body'), 'code-container');
        this.codeContainer.setAttribute('contenteditable', '');

        this.inputContainer = create('div', select('body'), 'input-container');
        
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
        let ls = localStorage.getItem('ls-format-thing');
        if(ls){
            //this.settings.setValuesFromJSON(ls);
        }
        this.toField = create('input', this.inputContainer, ['input','input-to-field']);
        this.toField.setAttribute('type','text');
        this.toField.placeholder = this.defaultContent.to;
        this.toField.dataField = 'to';
        this.toField.addEventListener('input', this.onInput.bind(this));

        this.fromField = create('input', this.inputContainer, ['input','input-from-field']);
        this.fromField.setAttribute('type','text');
        this.fromField.placeholder = this.defaultContent.from;
        this.fromField.dataField = 'from';
        this.fromField.addEventListener('input', this.onInput.bind(this));

        this.subjectField = create('input', this.inputContainer, ['input','input-subject-field']);
        this.subjectField.setAttribute('type','text');
        this.subjectField.placeholder = this.defaultContent.subject;
        this.subjectField.dataField = 'subject';
        this.subjectField.addEventListener('input', this.onInput.bind(this));
        
        this.dateField = create('input', this.inputContainer, ['input','input-date-field']);
        this.dateField.setAttribute('type','text');
        this.dateField.placeholder = 'Dato og tid. f.eks: ' + this.defaultContent.date;
        this.dateField.dataField = 'date';
        this.dateField.addEventListener('input', this.onInput.bind(this));

        this.contentField = create('div', this.inputContainer, ['input','input-content-field']);
        this.contentField.setAttribute('contenteditable', '');
        this.contentField.innerHTML = this.defaultContent.content;
        this.contentField.addEventListener('input', ()=>{
            this.onContentInput();
        })

        this.copyBotton = create('button', this.inputContainer, ['input-copy-button']);
        this.copyBotton.innerText = 'Kopier kode';
        this.copyBotton.addEventListener('click', ()=>{
            this.codeContainer.classList.add('select-styled');
            selectText('.code-container');
            document.execCommand('copy');
            this.codeContainer.classList.remove('select-styled');
            selectText('.empty-container');
        })
        
        //console.log('ls:', localStorage.getItem('lsTest'));
        
    }
    onInput(ev){
        console.log('input', ev.currentTarget.value, this);
        this.content[ev.currentTarget.dataField] = ev.currentTarget.value;
        this.updateHTML();
        this.updateCode();

    }
    onContentInput(){
        this.content['content'] = this.contentField.innerText;
        this.updateHTML();
        this.updateCode();
    }
    resetContent(){
        console.log('reset');
        // this.settings.setValuesFromJSON(this.defaultContent);
        this.updateCode();
        this.updateHTML();
        this.saveSettings();
    }
    saveSettings(){
        localStorage.setItem('lsTest', this.settings.getValuesAsJSON(true));
    }
    html(el){
        if(el === undefined) el = this.content;
        let toHTML = (el.to === '') ? '' : `<div class="drn-format-email-header drn-format-email-to"><span>Til: </span>${el.to}</div>`;
        let fromHTML = (el.from === '') ? '' : `<div class="drn-format-email-header drn-format-email-from"><span>Fra: </span>${el.from}</div>`;
        let subjectHTML = (el.subject === '') ? '' : `<div class="drn-format-email-header drn-format-email-subject"><span>Emne: </span>${el.subject}</div>`;
        let h = `<div class="drn-format-email-wrapper">
            <div class="drn-format-mail-logo">${mailSVG()}</div>${toHTML}${fromHTML}${subjectHTML}
            <div class="drn-format-email-header drn-format-email-date">${el.date}</div>
            <div class="drn-format-email-content">${el.content.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/😊|😂/g, ':-)')}</div>
        </div>
        <style>${CSS.styles()}</style>`;
    
        return h;

        function mailSVG(){
            return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="30px" height="20px" viewBox="0 0 30 20" style="enable-background:new 0 0 30 20;" xml:space="preserve">
            <polygon fill="#b8b8b8" points="0,0 30,0 15,9.8 "/>
            <polygon fill="#b8b8b8" points="0,1.5 0,20 30,20 30,1.5 15,11.2 "/>
            </svg>
            `
        }
        
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

     /*    this.settings.setValue('Farve', color);
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
 */
        
        this.updateHTML();
    }

}