const messageErrorUser = (field) => {
    const messages = {
        full_name: {
            nameFormat: 'The full name should contain only letters and spaces.',
            empty: 'The full name is required.',
            max: (max) => `The full name must be at most ${max} characters.`,
            min: (min) => `The full name must be at least ${min} characters.`,
            required: 'The full name is required.'
        },
        CPF: {
            empty: 'The CPF is required.',
            min: (min) => `The CPF must have exactly ${min} digits.`,
            number: 'The CPF should contain only numbers.',
            required: 'The CPF is required.'
        },
        password: {
            passwordMin: 'The password must contain at least one special character and one uppercase letter.',
            min: (min) => `The password must be at least ${min} characters.`,
            max: (max) => `The password must be at most ${max} characters.`,
            empty: 'The password is required.',
            required: 'The password is required.'
        },
        email: {
            email: 'The email must be a valid address.',
            empty: 'The email is required.',
            max: (max) => `The email must be at most ${max} characters.`,
            required: 'The email is required.'
        }
    };

    return messages[field];
};

module.exports = messageErrorUser;