import printMe from './print';
import { cube } from './math';
import './style.css';

function component() {
    return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
        let element = document.createElement('div');

        element.innerHTML = _.join(['hello', 'html', 'come'], ' ');
        element.classList.add('hello');

        let btn = document.createElement('button');
        btn.innerText = 'click button';
        btn.onclick = printMe;
        element.appendChild(btn);

        let img = new Image();
        element.appendChild(img);

        let pre = document.createElement('pre');
        pre.innerHTML = [
            'hello',
            '5 cube is:',
            cube(5)
        ].join('\n');
        element.appendChild(pre);

        return element;
    }).catch(error => `error come: ${error}`);
}

component().then(comp => document.body.appendChild(comp));

