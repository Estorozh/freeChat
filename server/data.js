var FreeChat = {
  chatRooms: {
    general: {
      name: 'general',
      link: '/chat_general',
      messages: [],
      users: {},
    },
    flood: {
      name: 'flood',
      link: '/chat_flood',
      messages: [],
      users: {},
    },
  },
  // nameRoom: {
  //   name: string,
  //   link: string,
  //   messages: array,
  //   users: object
  // }
  users: {},
  //{
  //  name: string,
  //  activeRoomLink: string,
  //},
};

module.exports = FreeChat;
