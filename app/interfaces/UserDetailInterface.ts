export interface UserDetailInterface {
    userId: string;
    email: string;
    username: string;
    profileImage?: string;
    spotifyAccessToken: string;
    isPremium: boolean;
    playListCreated: number; 
}