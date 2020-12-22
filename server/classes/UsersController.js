class UsersController {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }

  getByID(id) {
    let user = this.users.filter(user => user.id === id)[0];

    if(user) {
      return user;
    }

    return false;
  }

  getUsers() {
    return this.users;
  }

  getUsersByRoom(room) {
    return this.users.filter(user => user.room === room);
  }

  removeUser(id) {
    let user = this.getByID(id);

    if(user) {
      this.users = this.users.filter(user => user.id !== id);
      return user;
    }

    return false;
  }
}

module.exports = UsersController;
