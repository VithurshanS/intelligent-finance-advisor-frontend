export type LoginResponse = {
	username: string;
	token: string;
}

export interface ValidationError {
	loc: (string | number)[];
	msg: string;
	type: string;
}

export interface HTTPValidationError {
	detail: ValidationError[];
}

export interface User {
	username: string;
	name: string;
	email: string;
	avatar?: string;
}