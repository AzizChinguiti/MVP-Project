import express from "express";
import { Sequelize, DataTypes } from "sequelize";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize('profiles', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const Profile = sequelize.define('Profile', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: false
  },
  networth: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'profile', 
  timestamps: false 
});

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

app.get("/", (req, res) => {
  res.json("hello");
});
app.get("/profile", async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.json(profiles);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.post("/profile", async (req, res) => {
  try {
    const { title, desc, cover, networth } = req.body;
    const profile = await Profile.create({ title, desc, cover, networth });
    res.json(profile);
  } catch (err) {
    res.send(err);
  }
});

app.delete("/profile/:id", async (req, res) => {
  try {
    const profileId = req.params.id;
    await Profile.destroy({ where: { id: profileId } });
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.send(err);
  }
});

app.put("/profile/:id", async (req, res) => {
  try {
    const profileId = req.params.id
    const {title, desc, cover, networth} = req.body 
    const [updated] = await Profile.update({ title, desc, cover, networth }, { where: { id: profileId } })
    if (updated) {
      const updatedProfile = await Profile.findOne({ where: {id: profileId} });
      res.json(updatedProfile);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (err) {
    res.send(err);
  }
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});