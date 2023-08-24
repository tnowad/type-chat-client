export interface User {
  _id: string;
  email: string;
  firstName: string;
  avatar: string;
  lastName: string;
  verified: string;
  createAt: string;
}

export interface Message {
  id: string;
  type: "text" | "image" | "video";
  sender: User;
  content: string;
  timestamp: number;
  callDuration?: number;
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  isPrivate: boolean;
}

export type FriendStatus = "pending" | "accepted" | "rejected";

export interface Friend {
  _id: string;
  createdAt: string;
  updatedAt: string;
  friend: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    _id: string;
  };
  status: FriendStatus;
}
