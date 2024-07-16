import {atom} from 'recoil';

export const allUser = atom({
  key: 'allUser',
  default: [],
});

export const User = atom({
    key: 'User',
    default: null,
    });

    export const UserData = atom({
        key : 'UserData',
        default : null
    });