export const validate = (schema, source = 'body') => {
    return async (req, res, next) => {
        try {
            let dataToValidate;
            
            switch (source) {
                case 'body':
                    dataToValidate = req.body;
                    break;
                case 'params':
                    dataToValidate = req.params;
                    break;
                case 'query':
                    dataToValidate = req.query;
                    break;
                default:
                    dataToValidate = req.body;
            }

            const validatedData = await schema.parseAsync(dataToValidate);
            
            if (source === 'body') {
                req.body = validatedData;
            } else if (source === 'params') {
                req.params = validatedData;
            } else if (source === 'query') {
                req.query = validatedData;
            }
            
            next();
        } catch (error) {
            if (error.errors) {
                const formattedErrors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: formattedErrors
                });
            }
            
            return res.status(400).json({
                success: false,
                message: error.message || 'Validation error'
            });
        }
    };
};
