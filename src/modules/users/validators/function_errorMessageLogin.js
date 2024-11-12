const messageErrorLogin = () => ({
    login: {
        empty: 'Login cannot be empty. Enter your email or CPF',
        required: 'Login is required.',
        max: (limit) => `Login must have a maximum length of ${limit} characters.`,
        invalid: 'Login must be a valid email or CPF.',
    },
    password: {
        empty: 'Password cannot be empty.',
        required: 'Password is required.',
        min: (limit) => `The password must be at least ${limit} characters long.`,
        max: (limit) => `The password must be at most ${limit} characters long.`,
        pattern: 'The password must contain at least one uppercase letter and one special character.',
    },
});

module.exports = messageErrorLogin;