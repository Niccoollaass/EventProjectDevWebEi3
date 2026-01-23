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

export type AppEvent = {
  id: number;
  name: string;
  event_date: string;
  description: string;
  people_max: number;
  creator: string;
};
export type EventCardProps = {
  title: string;
};

export type Props = {
  title: string;
  date: string;
  description: string;
  creator: string;
  peopleMax: number;
};