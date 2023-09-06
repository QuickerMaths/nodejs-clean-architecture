import User from "./user.model";
import makeUserDb from "./users.db";

const usersDb = makeUserDb(User);

export default usersDb;
