class UserDto {
    id;
    phone;
    name;
    avatar;
    isActivated;
    createdAt;

    constructor(user) {
        this.id = user._id;
        this.phone = user.phone;
        this.name = user.name;
        this.activated = user.isActivated;
        this.avatar = user.avatar
            ? `${user.avatar}`
            : null;
        this.createdAt = user.createdAt;
    }
}

module.exports = UserDto;
