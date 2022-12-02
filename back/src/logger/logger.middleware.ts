import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        let request_path: string = '\'' + req.method + ':' + req.baseUrl + req.path;
        if (request_path.slice(-1) === '/') {
            request_path += '\'';
        } else {
            request_path += '/\'';
        }

        request_path = request_path.padEnd(55);
        // красивый log
        console.log(
            this.getCurrentTimeString()
            + ' UTC'
            + '\t'
            + request_path
        );
        next();
    }

    private getCurrentTimeString(): string {
        let res = ""; // результирующая переменная
        const data: Date = new Date(); // инициализация дата-времени
        const hh: number = data.getUTCHours(); // получить UTC часы
        const mm: number = data.getUTCMinutes(); // получить UTC минуты
        const ss: number = data.getUTCSeconds(); // получить UTC секунды
    
        if (hh < 10) {
            // делаем часы более читабельными
            res += '0';
        }
    
        res += hh + ':';
    
        if (mm < 10) {
            // делаем минуты более читабельными
            res += '0';
        }
    
        res += mm + ':';
    
        if (ss < 10) {
            // делаем секунды более читабельными
            res += '0';
        }
    
        res += ss;
    
        return res; // возвращаем время в красивом формате
    }
}
