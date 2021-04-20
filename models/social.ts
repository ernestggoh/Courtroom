export interface SocialModel {
  id?: string;

  eventName: string;
  eventDescription: string;
  eventImage: string;
  units: string;
  major: string;
  commitments: string;
  owner: string;
  interested?: {
    [key: string]: boolean;
  };
  upvote?: {
    [key: string]: boolean;
  };
  downvote?: {
    [key: string]: boolean;
  };
  upvotes: number;
}
