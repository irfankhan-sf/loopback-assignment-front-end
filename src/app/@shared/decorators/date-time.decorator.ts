import { formatDate } from '@angular/common';

export function DateTimeDecorator(format: string = "DD/MM/YYYY hh:mm a"): any {
    return function (target: any, key: string) {
        let val = target[key];
        const getter = () =>{
            return val;
        }
        const setter = (next:string)=>{
            val = formatDate(next, format, 'en-US');
        }
        Object.defineProperty(target, key, {
            enumerable: true,
            configurable: true,
            get: getter,
            set: setter,

        });
    }
}