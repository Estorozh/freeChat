function testingRepeatingRoom(name) {
  let { chatRooms } = FreeChat;
  let shouldAddRoom = Object.keys(chatRooms).filter((room) => room === name);
  if (!shouldAddRoom.length) {
    chatRooms[name] = { name, link: `chat_${name}`, messages: [], users: {} };
    io.emit('resRoomsUsers', getRoomsUsers(chatRooms));
  }
}

module.exports = testingRepeatingRoom;
