export interface UserModel {
  id?: string;

  userNickname: string;
  userAbout: string;
  userImage: string;
  userTypeOfCase: string;
  userLocation: string;
  userType: string;
  interested: {
    [key: string]: boolean;
  };
  owner: string;
}
