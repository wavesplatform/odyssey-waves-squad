// GetClaimResponce.js

class CreateExtraInfoResponce {
    constructor(){
        this.description = '';
        this.shipmentId = '';
        this.location = {
            longitude:'',
            latitude:''
        };
    }
}
    
module.exports = CreateExtraInfoResponce;