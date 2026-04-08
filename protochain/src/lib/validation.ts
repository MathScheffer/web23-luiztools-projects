/*
Class Validation
Classe para lançar mensagem de validação
*/
export default class Validation {
    success: boolean;
    message: string;
/**
 * 
 * @param success if validation was successful
 * @param message The validation message
 */
    constructor(success: boolean = true, message: string = ""){
        this.success = success
        this.message = message
    }
}