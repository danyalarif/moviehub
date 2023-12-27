export const emailValidation = (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value?.trim()) ? null : 'Email must be valid'
export const passwordValidation = (value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?^&])[A-Za-z\d@$!%*#?^&]{8,}$/ ? null : 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number'
