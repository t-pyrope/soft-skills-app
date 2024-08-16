export const getErrorMessage = (type: string) => {
    switch (type) {
        case 'pattern':
            return `Doesn't look like an email`;
        case 'minLength':
            return 'Too short';
        case 'required':
        default:
            return 'Required';
    }
};
