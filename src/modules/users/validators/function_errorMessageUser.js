module.exports = function messageErrorUser() {
    return {
        name: {
            nameFormat: "O nome deve conter apenas letras e espaços.",
            empty: "O nome não pode estar vazio.",
            max: (max) => `O nome deve ter no máximo ${max} caracteres.`,
            min: (min) => `O nome deve ter no mínimo ${min} caracteres.`,
            required: "O nome é obrigatório.",
        },
        email: {
            email: "O email deve ser válido.",
            empty: "O email não pode estar vazio.",
            max: (max) => `O email deve ter no máximo ${max} caracteres.`,
            required: "O email é obrigatório.",
        },
        password: {
            passwordMin: "A senha deve conter ao menos uma letra maiúscula e um caractere especial.",
            min: (min) => `A senha deve ter no mínimo ${min} caracteres.`,
            max: (max) => `A senha deve ter no máximo ${max} caracteres.`,
            empty: "A senha não pode estar vazia.",
            required: "A senha é obrigatória.",
        },
        cpf: {
            empty: "O CPF não pode estar vazio.",
            length: (length) => `O CPF deve ter ${length} caracteres.`,
            number: "O CPF deve conter apenas números.",
            required: "O CPF é obrigatório.",
        },
        phone_user: {
            empty: "O telefone não pode estar vazio.",
            length: (length) => `O telefone deve ter ${length} caracteres.`,
            number: "O telefone deve conter apenas números.",
            required: "O telefone é obrigatório.",
        },
        gender_id: {
            number: "O ID de gênero deve ser um número inteiro.",
            required: "O ID de gênero é obrigatório.",
        },
        education_id: {
            number: "O ID de educação deve ser um número inteiro.",
            required: "O ID de educação é obrigatório.",
        },
        role_id: {
            number: "O ID de função deve ser um número inteiro.",
            required: "O ID de função é obrigatório.",
        },
        address_id: {
            number: "O ID de endereço deve ser um número inteiro.",
            required: "O ID de endereço é obrigatório.",
        },
        code_user: {
            required: "O código do usuário é obrigatório.",
        },
        birth_date: {
            invalid: "A data de nascimento deve ser válida.",
            required: "A data de nascimento é obrigatória.",
        },
    };
};
