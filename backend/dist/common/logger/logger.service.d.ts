import { LoggerService } from '@nestjs/common';
export declare class CustomLogger implements LoggerService {
    private logger;
    log(message: any): void;
    error(message: any, trace?: string): void;
    warn(message: any): void;
}
