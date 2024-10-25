import { AuthService } from './auth.service';
import { CustomLogger } from 'src/common/logger/logger.service';
export declare class AuthController {
    private authService;
    private readonly logger;
    constructor(authService: AuthService, logger: CustomLogger);
    getProfile(req: any): any;
}
