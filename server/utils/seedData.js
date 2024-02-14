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

    for (let i = 0; i < 20; i++) {
        const user = new User({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: "password",
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            image: faker.image.avatar(),
        });
        await user.save();
        users.push(user);
    }

    const channelNames = [
        { name: "anime", image: "https://loremflickr.com/320/240/anime" },
        { name: "movies", image: "https://loremflickr.com/320/240/movies" },
        { name: "music", image: "https://loremflickr.com/320/240/music" },
        { name: "books", image: "https://loremflickr.com/320/240/books" },
        { name: "sports", image: "https://loremflickr.com/320/240/sports" },
        { name: "games", image: "https://loremflickr.com/320/240/games" },
        { name: "technology", image: "https://loremflickr.com/320/240/technology" },
        { name: "food", image: "https://loremflickr.com/320/240/food" },
        { name: "travel", image: "https://loremflickr.com/320/240/travel" },
        { name: "fitness", image: "https://loremflickr.com/320/240/fitness" },
    ];

    for (let i = 0; i < channelNames.length; i++) {
        const channel = new Channel({
            name: channelNames[i].name,
            image: channelNames[i].image,
            moderator: users[i % users.length]._id,
            members: users.map((user) => user._id),
        });
        await channel.save();
        channels.push(channel);
    }

    for (let i = 0; i < users.length; i++) {
        const numConversations = Math.floor(Math.random() * 3) + 3;
        for (let j = 0; j < numConversations; j++) {
            const members = [users[i]._id];
            while (members.length < 4) {
                const randomUser = users[Math.floor(Math.random() * users.length)];
                if (!members.includes(randomUser._id)) {
                    members.push(randomUser._id);
                }
            }
            const conversation = new Conversation({
                members: members,
            });
            await conversation.save();
            conversations.push(conversation);
        }
    }

    for (let i = 0; i < channels.length; i++) {
        const numMessages = Math.floor(Math.random() * 51) + 50;
        for (let j = 0; j < numMessages; j++) {
            const message = new Message({
                text: faker.lorem.sentence(),
                userId: channels[i].members[j % channels[i].members.length],
                channelId: channels[i]._id,
                timestamp: faker.date.recent(),
            });
            await message.save();
            channels[i].messages.push(message._id);
            await channels[i].save();
        }
    }

    for (let i = 0; i < conversations.length; i++) {
        const numMessages = Math.floor(Math.random() * 51) + 50;
        for (let j = 0; j < numMessages; j++) {
            const message = new Message({
                text: faker.lorem.sentence(),
                userId: conversations[i].members[j % conversations[i].members.length],
                conversationId: conversations[i]._id,
                timestamp: faker.date.recent(),
            });
            await message.save();
            conversations[i].messages.push(message._id);
            await conversations[i].save();
        }
    }

    console.log("Data seeded successfully!");
    process.exit(0);
}

seedData().catch(console.error);