import Genre from '@/constraints/enums/IGenre';

export function RequiredString(target: any, propertyKey: string) {
    // target của property decorator sẽ tham chiếu đến constructor function của class

    // Trong TypeScript, target của một decorator được sử dụng để tham chiếu đến đối tượng
    // hoặc hàm mà decorator được áp dụng lên. Giá trị của target phụ thuộc vào loại decorator
    // và cách mà nó được sử dụng.

    // Với class decorator, target là constructor của class.
    // Với method decorator, target là prototype của class và tên của phương thức.
    // Với property decorator, target là prototype của class và tên của thuộc tính.
    // Với parameter decorator, target là prototype của class, tên của phương thức hoặc thuộc tính, và index của tham số.
    let value = target[propertyKey];

    const getter = () => value;
    const setter = (newValue: string) => {
        if (typeof newValue !== 'string') {
            throw new Error(`data type for ${propertyKey} must be a string`);
        }
        if (
            newValue === null ||
            newValue === undefined ||
            newValue.length === 0
        ) {
            throw new Error(`Invalid value for ${propertyKey}`);
        }
        value = newValue.trim();
    };

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
    });
}

export function validateGenreSong(target: any, propertyKey: string) {
    let value = target[propertyKey];

    const getter = () => value;
    const setter = (newValue: Genre) => {
        switch (newValue) {
            case Genre.BALLAD:
                value = newValue;
                break;
            case Genre.BOLERO:
                value = newValue;
                break;
            case Genre.CLASSICAL:
                value = newValue;
                break;
            case Genre.ELECTRONIC:
                value = newValue;
                break;
            case Genre.HIP_HOP:
                value = newValue;
                break;
            case Genre.POP:
                value = newValue;
                break;
            case Genre.R_AND_B:
                value = newValue;
                break;
            case Genre.Rock:
                value = newValue;
                break;
            default:
                throw new Error(
                    `data does not match the pre-designed for ${propertyKey}`,
                );
        }
    };

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
    });
}

export function FormatDate(target: any, propertyKey: string) {
    let value = target[propertyKey];
    const getter = () => value;
    const setter = (newString: string) => {
        value = newString.replace('2002', '123');
    };
    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
    });
}
