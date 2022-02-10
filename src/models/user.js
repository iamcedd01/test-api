import { v4 as uuidv4 } from "uuid";
import { Sequelize, sequelize } from ".";

const User = sequelize.define("User", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUIDV4,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
    },
    post_code: {
        type: Sequelize.STRING,
    },
    contact_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

User.beforeCreate((user) => (user.id = uuidv4()));

export default User;
