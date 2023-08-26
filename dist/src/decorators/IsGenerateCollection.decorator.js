"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const regex_util_1 = require("../utils/regex.util");
function IsGenerateCollection(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: {
                validate(value, args) {
                    try {
                        const object = args.object;
                        const property = object[propertyName];
                        if (Array.isArray(value)) {
                            return value.every((element) => (0, regex_util_1.regexUuidV4Validation)(element));
                        }
                        else {
                            return (0, regex_util_1.regexUuidV4Validation)(value);
                        }
                    }
                    catch (error) {
                        console.log(error);
                        return false;
                    }
                },
            },
        });
    };
}
exports.default = IsGenerateCollection;
//# sourceMappingURL=IsGenerateCollection.decorator.js.map