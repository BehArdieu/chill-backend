import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                first_name: string;
                last_name: string;
                interests: string[];
                id: string;
                email: string;
                username: string;
                created_at: Date;
            };
            token: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                first_name: string;
                last_name: string;
                interests: string[];
                id: string;
                email: string;
                username: string;
                is_active: boolean;
            };
            token: string;
        };
    }>;
    getProfile(req: any): Promise<{
        success: boolean;
        data: {
            first_name: string;
            last_name: string;
            id: string;
            email: string;
            username: string;
            is_active: boolean;
        };
    }>;
    refresh(req: any): Promise<{
        success: boolean;
        data: {
            token: string;
        };
    }>;
}
