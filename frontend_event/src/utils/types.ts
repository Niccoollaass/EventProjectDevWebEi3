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

export type EventItem = {
  id: number;
  name: string;
  event_date: string;
  description: string;
  nb_participants:number;
  people_max: number;
  creator_username: string;
  creator_id: number;
};

export type EventInput = {
  name: string;
  event_date: string;
  description: string;
  people_max: number;
};
export type EventWithRegistration = EventItem & {
  is_registered: boolean;
};
export type EventCardProps = EventWithRegistration & {
  authorized: boolean;
  onDelete: (id: number) => void;
  onModify: (id: number) => void;
  is_registered:boolean;
  onRegister: (id: number) => void;
  onUnRegister: (id: number) => void;
};

export type Props = {
  event: EventItem;
  canEdit: boolean;
  onEdit: () => void;
  is_registered:boolean;
};

export type CreateEventData = {
  name: string;
  event_date: string;
  description: string;
  people_max: number;
};

export type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    event_date: string;
    description: string;
    people_max: number;
  }) => Promise<void>;
  selectedEvent?: any | null; // ou ton type EventItem | null
  isEdit?: boolean;
};