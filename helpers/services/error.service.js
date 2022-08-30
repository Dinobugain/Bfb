let errors = {
    OPERATIONS_NOT_FOUND: {
        result: false,
        code: 0,
        value: 'operations not found'
    },
    UNKNOWN:{
        result: false,
        code: 1,
        value: 'unknown error'
    },
    EXPRESSION_IS_INVALID:{
        result: false,
        code: 3,
        value: 'expression is invalid'
    }
}

module.exports = Object.freeze(errors);