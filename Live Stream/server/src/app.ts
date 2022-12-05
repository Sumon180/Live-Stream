import express from "express";
import { AppDataSource } from "../../server/src/data-source";
import { User } from "../../server/src/entity/User";

const app = express();
const PORT = 4000;
app.use(express.json());

app.get("/", async (req, res) => {
  const users = await AppDataSource.manager.find(User);
  res.send(users);
});
app.post("/user", async (req, res) => {
  const user = new User();
  user.firstName = "Tutol";
  user.lastName = "Mondal";
  user.age = 37;
  await AppDataSource.manager.save(user);
  res.send(user);
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");

    app.listen(PORT, (): void => {
      console.log(`Server Is running on port:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
