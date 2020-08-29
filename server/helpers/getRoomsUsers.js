function getRoomsUsers(target) {
  return Object.values(target).map((data) => data.name);
}

module.exports = getRoomsUsers;
