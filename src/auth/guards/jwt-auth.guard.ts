import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private supabaseService: SupabaseService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }

        const token = authHeader.replace('Bearer ', '');

        const { data, error } = await this.supabaseService.client.auth.getUser(token);

        if (error || !data.user) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        request.user = {
            id: data.user.id,
            email: data.user.email,
            role: data.user.user_metadata.role,
        };

        return true;
    }
}