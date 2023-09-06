import User from "../../models/user.model.js";
import makeUserDb from "./users.db.js";

const usersDb = makeUserDb(User);

export default usersDb;
