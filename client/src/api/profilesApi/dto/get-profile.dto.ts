type Profile = {
    id: number;
    firstName: string;
    secondName: string;
    avatarUrl: string;
    description: string;
    createdAt: Date;
    userId: number;
}

export type GetProfileDTO = Profile;