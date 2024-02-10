import connection from "../config/connection.js";
import { faker } from "@faker-js/faker";
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
               firstName: faker.person.firstName(),
               lastName: faker.person.lastName(),
               image: faker.image.avatar(),
          });
          await user.save(); // Save each user individually
          users.push(user);
     }

     for (let i = 0; i < 10; i++) {
          const channel = new Channel({
               name: faker.music.genre(),
               image: faker.image.avatarGitHub(),
               moderator: users[i]._id,
               members: users
                    .slice(i, i + 10)
                    .concat(users.slice(0, 10 - i))
                    .map((user) => user._id),
          });
          await channel.save(); // Save each channel individually
          channels.push(channel);
     }

     for (let i = 0; i < users.length; i++) {
          const numConversations = faker.number.int({ min: 5, max: 10 });
          for (let j = 0; j < numConversations; j++) {
               const numMembers = faker.number.int({ min: 2, max: 6 });
               const members = [users[i]._id];
               for (let k = 1; k < numMembers; k++) {
                    members.push(users[(i + k) % users.length]._id);
               }
               const conversation = new Conversation({
                    members: members,
               });
               await conversation.save(); // Save each conversation individually
               conversations.push(conversation);
          }
     }

     for (let i = 0; i < channels.length; i++) {
          const numMessages = faker.number.int({ min: 30, max: 100 });
          for (let j = 0; j < numMessages; j++) {
               const message = new Message({
                    text: faker.lorem.sentence(),
                    userId: users[j % 50]._id,
                    channelId: channels[i]._id,
                    timestamp: faker.date.recent(),
               });
               await message.save(); // Save each message individually

               const channel = channels[i];
               channel.messages.push(message._id);
               await channel.save();
          }
     }

     for (let i = 0; i < conversations.length; i++) {
          const numMessages = faker.number.int({ min: 30, max: 100 });
          for (let j = 0; j < numMessages; j++) {
               const message = new Message({
                    text: faker.lorem.sentence(),
                    userId: users[j % 50]._id,
                    conversationId: conversations[i]._id,
                    timestamp: faker.date.recent(),
               });
               await message.save(); // Save each message individually

               const conversation = conversations[i];
               conversation.messages.push(message._id);
               await conversation.save();
          }
     }

     console.log("Data seeded successfully!");
     process.exit(0);
}

seedData().catch(console.error);
