import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private usersService;
    constructor(prisma: PrismaService, jwtService: JwtService, usersService: UsersService);
    register(registerDto: RegisterDto): Promise<{
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
    }>;
    login(loginDto: LoginDto): Promise<{
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
    }>;
    validateUser(userId: string): Promise<{
        first_name: string;
        last_name: string;
        id: string;
        email: string;
        username: string;
        is_active: boolean;
    }>;
    generateToken(user: any): string;
}
