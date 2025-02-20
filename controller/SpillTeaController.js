const { default: mongoose } = require('mongoose');
const Story = require('../models/Story');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10

exports.getAllStories = async (req, res) => {

    try {
        const stories = await Story.find();
        res.json(stories);
    } catch (err) {
        res.status(500).send('SERVER ERROR @ GETSTORIES')
    }
}

exports.getStoryById = async (req, res) => {
    try {
        const storyId = req.params.id
        const story = await Story.findById(storyId)
        if (!story) return res.status(404).json({ msg: 'Story not Found' });
        res.json(story)
    } catch (err) {
        res.status(500).send('SERVER ERROR @ GETSTORY')
    }
}

exports.createStory = async (req, res) => {
    try {
        const { title, story, tags, userId } = req.body

        const newStory = new Story({
            createdBy: new mongoose.Types.ObjectId(userId),
            title: title,
            story: story,
            tags: tags
        })

        await newStory.save();
        return res.status(200).json(newStory)
    } catch (err) {
        return res.status(500).send(err)
    }
}

exports.getStoriesByUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        const validUserId = mongoose.Types.ObjectId.isValid(userId)
      
        if (!validUserId) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }
        const stories = await Story.find({ createdBy: userId }).exec();

        if (!stories.length) {
            return res.status(404).json({ message: 'No stories found for this user' });
        }

        return res.status(200).json(stories);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


exports.authenticateUser = async (req, res) => {
    try {
        const { password, userNick } = req.body

        if (!userNick || !password) {
            return res.status(400).send('Username and password are required');
        }

        const user = await User.findOne({ user_nick: userNick })
        // console.log(user)

        if (!user) {
            return res.status(404).send('User NOT Found')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash)

        if (isPasswordValid) {
            return res.status(200).send('Authentication successful')
        } else {
            return res.status(401).send('Invalid password')
        }

    } catch (err) {
        return res.status(500).send(err)
    }
}

exports.createUser = async (req, res) => {
    try {
        const { password, userNick } = req.body

        if (!userNick || !password) {
            return res.status(400).send('Username and password are required');
        }

        const user = await User.findOne({ userNick })

        if (user) {
            return res.status(400).send('User Already Exists')
        }

        const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS)
        const newUser = new User({
            user_nick: userNick,
            password_hash: passwordHash
        })

        newUser.save();
        return res.status(200).send('User Created')

    } catch (err) {
        return res.status(500).send(err)
    }
}