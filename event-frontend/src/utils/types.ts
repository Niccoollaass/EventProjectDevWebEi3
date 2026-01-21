export interface LoginResponse{
    token:string;
}

export interface SignUpResponse{
    token:string;
}
export interface User{
    id:number;
    username:string;
}


export type HeaderProps = {
  title: string;
  user: User | null;
};