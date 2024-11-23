const knexInstance = require('../../../config/db');

const userModel = {
    create: async (user) => {
        const db = await knexInstance();
        const [id] = await db('users').insert(user);
        return id;
    },
    findByEmail: async (email) => {
        const db = await knexInstance();
        return db('users').where({ email }).first();
    },
    findByCpf: async (cpf) => {
        const db = await knexInstance();
        return db('users').where({ cpf }).first();
    },
    findById: async (id) => {
        const db = await knexInstance();
        return db('users').where({ id }).first();
    },
    findByLevel: async (role_id) => {
        const db = await knexInstance();
        return db('role').where({ id: role_id }).first();
    },
    update: async (id, user) => {
        const db = await knexInstance();
        return db('users').where({ id }).update(user);
    },
    delete: async (id) => {
        const db = await knexInstance();
        return db('users').where({ id }).del();
    }
};

module.exports = userModel;
