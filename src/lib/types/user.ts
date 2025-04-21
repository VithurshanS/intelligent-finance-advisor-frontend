import {decodeJwt} from "jose";
import {JOSEError, JWTExpired} from "jose/errors";
import {verifyUser} from "@/actions/auth";

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    UNDEFINED = "undefined"
}

export enum Role {
    ADMIN = "admin",
    USER = "user"
}

export type TokenPayload = {
    sub: string; // username
    exp: number; // expiration time
    // role: Role;
}

export interface User {
    username: string;
    name: string;
    email: string;
    role: Role;
    user_id: string;
    avatar?: string;
    token?: string;
}

export class UserModel implements User {
    username: string;
    name: string;
    email: string;
    role: Role;
    user_id: string;
    token?: string;
    avatar?: string;

    constructor(user: User) {
        this.username = user.username;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.user_id = user.user_id;
        this.token = user.token;
        this.avatar = user.avatar;
    }

    // Example: Decrypt JWT token with proper error handling
    decryptToken(token?: string): TokenPayload | null {
        // If no token is provided, return null
        if (!token) {
            return null;
        }

        try {
            return decodeJwt(token) as TokenPayload;
        } catch (error) {
            if (error instanceof JOSEError) {
                console.error("Token decryption failed:", error.message);
            } else if (error instanceof JWTExpired) {
                console.error("Token is expired");
            } else {
                console.error("Unknown error decrypting token:", error);
            }
            return null;
        }
    }

    // Verify the current user with the backend
    async verify(): Promise<boolean> {
        try {
            // Call the external verifyUser function
            const tokenUsername = this.decryptToken(this.token)?.sub;
            if (!(tokenUsername !== this.username)) {
                console.error("Token is invalid");
                return false;
            }

            const userData = await verifyUser(this.user_id);
            if (userData) {
                // Update the current user instance with fresh data
                this.username = userData.username;
                this.name = userData.name;
                this.email = userData.email;
                this.role = userData.role;
                this.avatar = userData.avatar;

                return true;
            }
            return false;
        } catch (error) {
            console.error("Error verifying user:", error);
            return false;
        }
    }

    // Convert user data to JSON
    toJSON(): string {
        return JSON.stringify({
            username: this.username,
            name: this.name,
            email: this.email,
            role: this.role,
            user_id: this.user_id,
        });
    }
}