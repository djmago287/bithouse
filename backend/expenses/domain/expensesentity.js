//
export class ExpenseEntity{
    constructor( value, description, paymentmethod, hour, date, type, idUser)
    {
        this._id = "";
        this._value = value;
        this._description = description;
        this._paymentmethod = paymentmethod;
        this._hour = hour;
        this._date = date;
        this._type = type;
        this._idUser = idUser;
        
    }
    //this is validate function params undefined
    validateExpense()
    {
        if (!this._value  ||
            !this._description  ||
            !this._hour  ||
            !this._date  ||
            !this._type  ||
            !this._idUser 
        ) {
            return false
        }else{
            return true
        }
    }
    //this is validate for data as iduser and idexpense  the expense required
    validatedeleteExpense()
    {
        //_id is idexpense_idUser idusuario
        if(!this._id || !this._idUser)
        {
            return false;
        }else{
            return true;
        }
    }
}