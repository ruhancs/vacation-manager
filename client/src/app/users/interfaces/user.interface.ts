
export type User = {
    id: string;
    name: string;
    job_role: string;
    recruitment_date: string;
}

export type OneUser = {
    id: string;
    name: string;
    job_role: string;
    recruitment_date: string;
    vacations: Vacation[]
}

export interface CreateUser {
    name: string;
    job_role: string;
    recruitment_date: string
}

export interface RegisterVacationDto {
    start_date: string;
    end_date: string;
}

interface Vacation {
    start_date: string;
    end_date: string;
}