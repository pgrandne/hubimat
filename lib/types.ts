import { ResponseCodeStatus } from "./enums";

/**Reponse from Core Service*/
export interface ApplicationResponse {
    status?: string | null;
    message?: string | null;
    code: ResponseCodeStatus | null;
    updatedObject?: any | null;
    success: boolean;
}