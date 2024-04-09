import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./auth.constants";

@Injectable()
export class AuthGuard {
    constructor(private jwtService: JwtService) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = this.extractToken(req);

        const errorMessage = "You are not authorized";
        
        if (!token) {
            throw new UnauthorizedException(errorMessage);
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: jwtConstants.secret }
            );

            req.user = payload;
        } catch {
            throw new UnauthorizedException(errorMessage);
        }

        return true;
    }

    private extractToken(req: Request) {
        const [type, token] = req.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : null;
    }
}