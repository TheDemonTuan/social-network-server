import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isVietnameseString', async: false })
export class IsVietnameseStringConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    // Kiểm tra xem chuỗi chỉ chứa ký tự chữ tiếng Việt
    const vietnameseRegex = /^[a-zA-ZÀ-ỹ\s]*$/;
    return vietnameseRegex.test(value);
  }

  defaultMessage(): string {
    return '($value) is not a valid Vietnamese string';
  }
}

export function IsVietnameseString(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsVietnameseStringConstraint,
    });
  };
}