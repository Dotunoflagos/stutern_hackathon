function validateWithSchema(schema, body) {
    const { error } = schema.validate(body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((detail) => detail.message);
        return errorMessage;
    } else {
        return null;
    }
}

module.exports = {
    validateWithSchema
}