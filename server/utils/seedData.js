import connection from "../config/connection.js";
import faker from "../node_modules/faker/index.js";
import { User, Message, Channel, Conversation } from "../models/models.js";

async function seedData() {
     connection.once("open", () => {
          console.log("Connected to database and seeding...");
     });

     const users = [];
     const channels = [];
     const conversations = [];

     for (let i = 0; i < 50; i++) {
          const user = new User({
               username: faker.internet.userName(),
               email: faker.internet.email(),
               password: faker.internet.password(),
               firstName: faker.name.firstName(),
               lastName: faker.name.lastName(),
               image: faker.image.avatar(),
          });
          users.push(user);
     }

     await User.insertMany(users);

     for (let i = 0; i < 10; i++) {
          const channel = new Channel({
               name: faker.company.companyName(),
               image: faker.image.imageUrl(),
               moderator: users[i]._id,
               members: users.slice(i, i + 10).map((user) => user._id),
          });
          channels.push(channel);
     }

     await Channel.insertMany(channels);

     for (let i = 0; i < 20; i++) {
          const conversation = new Conversation({
               members: users.slice(i, i + 2).map((user) => user._id),
          });
          conversations.push(conversation);
     }

     await Conversation.insertMany(conversations);

     for (let i = 0; i < 100; i++) {
          const message = new Message({
               text: faker.lorem.sentence(),
               userId: users[i % 50]._id,
               channelId: i < 50 ? channels[i % 10]._id : null,
               conversationId: i >= 50 ? conversations[i % 20]._id : null,
               timestamp: faker.date.recent(),
          });
          await message.save();

          if (message.channelId) {
               const channel = channels.find((channel) => channel._id.toString() === message.channelId.toString());
               channel.messages.push(message._id);
               await channel.save();
          } else {
               const conversation = conversations.find(
                    (conversation) => conversation._id.toString() === message.conversationId.toString(),
               );
               conversation.messages.push(message._id);
               await conversation.save();
          }
     }

     console.log("Data seeded successfully!");
     process.exit(0);
}

seedData().catch(console.error);
