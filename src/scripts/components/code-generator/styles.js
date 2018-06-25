'use strict'
export default class CSS{
    constructor(){

    }
    static styles(){
        return `.drn-format-email-wrapper{
            font-size: 18px;
            line-height: 26px;
            color:#4d4d4d;
            position:relative;
            background:#F1F2F3;
            box-sizing: border-box;
            width:90%;
            margin:10px auto;
            padding:0.6em 0 1.2em 0;
            border-radius:10px;
            font-family: gibsonRegular, Gibson, sans-serif;
        }
        .drn-format-mail-logo{
            position: absolute;
            top:1.2em;
            right:2em;
        }
        .drn-format-email-header{
            padding:0 2.4em;
            line-height:3em;
            border-bottom: 1px solid #e1e1e1;
        }
        .drn-format-email-header span{
            color:#b8b8b8;
        }
        .drn-format-email-date{
            color:#b8b8b8;
        }
        .drn-format-email-content{
            padding: 1.6em 2.4em 0.8em 2.4em;
        }
        @media(max-width:767px){
            .drn-format-email-wrapper{
                width:100%;
                padding:0.6em 0 0.6em 0;
                font-size:16px;
                line-height:24px;
            }
            .drn-format-mail-logo{
                right:1em;
            }
            .drn-format-email-header{
                padding:0 1em;
            }
            .drn-format-email-content{
                padding: 1em 1em 0.4em 1em;
        
            }
        }`.replace(/[\ ]{2,}|[\r\n]/g, '');
    }
}