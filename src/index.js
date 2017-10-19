import _ from 'lodash';
import { cube } from './math';
import './style.css';

function component() {
    let element = document.createElement('div');

    element.innerHTML = _.join(['hello', 'html 111400000000008888999099'], ' ');
    element.classList.add('hello');

    let btn = document.createElement('button');
    btn.innerText = 'click here';
    // import此种引入方式为异步按需加载
    btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
        let print = module.default;
        print();
    });
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
}

document.body.appendChild(component());

if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
}
