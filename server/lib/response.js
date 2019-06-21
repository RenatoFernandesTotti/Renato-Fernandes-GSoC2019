
/**
 * @class response
 */
let _status = require('http-status')
class response{
    static get status() { return _status }

    /**
     * Method to generate a API response from a template
     * @param {Object} ApiResponse - The response containing all of the information to send back to the requester
     * @param {String[]} [ApiResponse.messages = undefined]  - Message of the code will include de code default message
     * @param {(String[]|Object)} [ApiResponse.result = undefined] - Result of api request, can be a JSON object or a string
     * @param {Number} [ApiResponse.code = 404] - Code of resulting request
     * @param {Object} ApiResponse.res - required param, NodeJS response Object
     * @param {String} [ApiResponse.error = undefined] - Error of the resquest, if any
     */
    
    static send(res,{messages=undefined,result=undefined,code=404,error=undefined}={}){
        var statuses = this.status[code]

        if(messages!=undefined){
            messages.push(this.status[code+'_MESSAGE'])
        }
        else
            messages = this.status[code+'_MESSAGE']

        return res.status(code).send({
            messages : messages,
            result : result,
            error: error
        })
    }
}

module.exports=response