export class SignUpDto {
    readonly login: string;
    readonly password: string;
    readonly firstName: string;
    readonly secondName: string;
    readonly description?: string;
}