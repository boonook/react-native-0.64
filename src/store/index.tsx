import UserState from './user'

class store {
    private userState: UserState;
    constructor() {
        this.userState = new UserState();
    }
}

export default new store();
