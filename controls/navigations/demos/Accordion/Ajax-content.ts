/**
 *  Toolbar default Sample
 */
import { Accordion} from '../../src/accordion/index';
import { Ajax } from '@syncfusion/ej2-base';


let ajax: Ajax = new Ajax('./Ajax.html', 'GET', true);
ajax.send().then();
ajax.onSuccess = (data: string): void => {
  let ctn: string = 'TypeScript is a free and open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language';
  let ctn1: string = 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces';
  let ctn2: string = data;
  let acrdnObj: Accordion = new Accordion({
    expandMode: 'Single',
    items: [
      { header: 'What is React?', content: ctn1, iconCss: 'e-athletics e-acrdn-icons' },
      { header: 'What is TypeScript?', content: ctn, expanded: true },
      { header: 'What is Angular?', content: ctn2}
    ]
  });
  acrdnObj.appendTo('#ej2Accordion');
};
document.getElementById('btn_touch').onclick = (e: Event) => {
  (<HTMLElement>document.getElementsByTagName('body')[0]).classList.add('e-bigger');
};
document.getElementById('btn_mouse').onclick = (e: Event) => {
  (<HTMLElement>document.getElementsByClassName('e-bigger')[0]).classList.remove('e-bigger');
};