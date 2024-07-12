const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw new Error(err.message);
  }
};

const comparePassword = async (password, userPassword) => {
  try {
    const result = await bcrypt.compare(password, userPassword);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports.hashPassword = hashPassword;
module.exports.comparePassword = comparePassword;
