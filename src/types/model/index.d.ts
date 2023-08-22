export interface User {
  _id: string;
  email: string;
  firstName: string;
  thumbnail: string;
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

export interface Friend {
  userId: string;
  friendId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}
