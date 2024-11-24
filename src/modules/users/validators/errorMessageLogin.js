const messageErrorLogin = () => ({
    email: {
        email: 'The email must be a valid address.',
        empty: 'Email is required.',
        invalid: 'The email provided is not valid.',
        max: (max) => `Email cannot exceed ${max} characters.`,
        required: 'Email is a required field.',
    },
    password: {
        empty: 'Password is required.',
        min: (min) => `Password must be at least ${min} characters long.`,
        max: (max) => `Password cannot exceed ${max} characters.`,
        required: 'Password is a required field.',
        pattern: 'Password does not meet the required format.',
    },
});

module.exports = messageErrorLogin;