const bcrypt = require("bcrypt");
const User = require("../../models/user");

const addUser = async (data) => {
    const { email, username, password, first_name, last_name, address, postcode, contact_phone_number } = data;

    return bcrypt.hash(password, this._salt).then((hash) => {
        return User.create({
            email,
            username,
            password: hash,
            first_name,
            last_name,
            address,
            postcode,
            contact_phone_number,
        });
    });
};

const deleteUser = async ({ id }) => {
    await User.destroy({ where: { id } });
};

const deleteUsers = async ({ ids }) => {
    await User.destroy({ where: { id: ids } });
};

const getUsers = async () => {
    await User.findAll();
};

const updateUser = async (data) => {
    const { id, password, ...user } = data;

    const _user = await User.findOne({ where: { id } });
    if (!_user) return;

    let userData = { ...user };
    if (!!password) {
        bcrypt.hash(password, this._salt).then((hash) => {
            userData = { ...userData, password: hash };
        });
    }

    return User.update(
        {
            ...userData,
        },
        { where: { id } }
    );
};

module.exports = { deleteUser, deleteUsers, updateUser, getUsers, addUser };

//     async deleteUser({ id }) {
//         await User.destroy({ where: { id } });
//     }

//     async deleteUsers({ ids }) {
//         await User.destroy({ where: { id: ids } });
//     }

//     async getUsers() {
//         await User.findAll();
//     }

//     async updateUser(data) {
//         const { id, ...user } = data;
//     }
// }
