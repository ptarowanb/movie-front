type ResponseMessage =
  | "SUCCESS"
  | "FAILED"
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "BAD_REQUEST"
  | "INTERNAL_SERVER_ERROR"
  | "CREATED"
  | "UPDATED"
  | "DELETED"
  | "DUPLICATE"
  | "INVALID"
  | "NOT_ALLOWED";

  export interface MovieType {
    id: string;
    title_id: number;
    title: string;
    number_ep: string;
    location?: string | null;
    createdBy?: string;
    createdDate?: string;
    image?: string;
    des?: string;
    author?: string | null;
    actor?: string;
    release_date?: string | null;
    updatedBy?: string;
    updatedDate?: string;
    latest_ep_date?: string;
    status?: number;
    genre?: string | null;
    producer?: string | null;
    video_episode?: number;
    view_count?: string;
    actor_images?: { [key: string]: string };
    episodes?: EpisodeType[];
    categories?: CategoryType[];
  }

  export interface EpisodeType {
    id: string;
    movie_id: string;
    ep_no: number;
    video_id: string;
    status: string;
    progress: string | null;
    video_url: string;
  }
  
  export interface CategoryType {
    id: string;
    cate_id: number;
    name: string;
  }

export interface AdType {
  id: string;
  img: string;
  dis: string;
  domain: string;
  shop_name: string | null;
  add_time: string | null;
  rank: string | null;
  w: string;
  h: string;
}

export interface ResponsePagination<T> {
  data?: T;
  size: number;
  page: number;
  totalItems: number;
}
export interface ResponseType<T> {
  data?: T;
  message?: ResponseMessage;
  status?: number;
  error?: string;
  subMessage?: string;
}

export interface CallbackTransaction {
  id: string;
  username: string;
  amount: number;
  transaction: object;
}
export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  isActive: boolean;
  apiKey?: string;
  createdAt?: string;
  loggedIn?: string;
  parentAgentId: string | null;
  agentParentName: string;
  rate: number;
  level: number;
  name: string;
  currency?: {
    code: string;
    id: number;
  };
  role?: {
    name: string;
    id: number;
  };
  roleId?: number;
  currencyId?: number;
  updatedAt?: string;
  currencyName?: string;
  roleName?: string;
  type?: string;
  parent?: User;
  agentId?: string;
}

export interface TransactionLimit {
  id: number;
  agentId: number;
  limitType: string;
  limitTypeId: string;
  limit: number;
}

export interface Agent extends User {
  rate: number;
  parentAgentId: string | null;
  level: number;
  agentParentName: string;
  Agents: {
    rate: number;
    parentAgentId: string | null;
    level: number;
    parentAgent: User;
    name: string;
  };
}
type transactionType =
  | "win"
  | "bet"
  | "cancel"
  | "deposit"
  | "withdraw"
  | "user.add_balance";

export interface Transactions {
  id: string;
  amount: string | number;
  receiver?: User | Agent | null;
  sender?: User | Agent | null;
  username?: string | null;
  agentUsername?: string | null;
  callbackId?: string | null;
  senderUser?: string;
  receiverUser?: string;
  type: transactionType;
  currencyId: number;
  status: string;
  method: string;
  updatedAt: string;
  createdAt: string;
  note?: string;
  token: string;
}

export interface Agent extends User {
  parentAgentId: number | null;
  level: number;
  agentParentName: string;
  Agents: {
    parentAgentId: number | null;
    level: number;
    parentAgent: User;
    name: string;
  };
}
type transactionType =
  | "win"
  | "bet"
  | "cancel"
  | "add"
  | "charge"
  | "adjust"
  | "promo_win"
  | "exceed_credit";
export interface Transactions {
  id: number;
  amount: string | number;
  receiver?: User | Agent | null;
  sender?: User | Agent | null;
  senderId?: string;
  receiverId?: string;
  senderName?: string;
  receiverName?: string;
  type: transactionType;
  currencyId: number;
  status: string;
  updatedAt: string;
  note?: string;
  token: string;
  userId: string;
}

interface FeaturePermissions {
  [key: string]: string[];
}

export interface Permissions {
  createdAt: string;
  deletedAt: string | null;
  id: number;
  name: string;
  permissions: FeaturePermissions;
  updatedAt: string;
}
