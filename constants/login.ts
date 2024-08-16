export const EMAIL_RULES = {
    required: true,
    pattern: /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/,
};

export const PASSWORD_RULES = {
    required: true,
    minLength: 3,
};

export const DISPLAY_NAME_RULES = {
    required: true,
    minLength: 3,
};
