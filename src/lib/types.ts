export type LoginResponse = {
	username: string;
	token: string;
	role: string;
}

export interface ValidationError {
	loc: (string | number)[];
	msg: string;
	type: string;
}

export interface HTTPValidationError {
	detail: ValidationError[];
}