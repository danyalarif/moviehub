export const titleValidation = (value) => /^[A-Za-z0-9\s]{3,100}$/.test(value?.trim()) ? null : 'Title must be between 3 and 100 characters'
export const summaryValidation = (value) => value?.length >= 3 && value.length <= 500 ? null : 'Summary must be between 3 and 500 characters long'
export const durationValidation = (value) => parseInt(value) > 0 ? null : 'Duration must be greater than 0'
export const genresValidation = (value) => value?.length === 0 ? 'Must select at-least one genre' : null