import { FieldValue } from "firebase/firestore";

export interface Message {
  text: string;
  createdAt: FieldValue;
  user: {
    _id?: string | null;
    name?: string | null;
    avatar: string;
  };
}
