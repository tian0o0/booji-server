export const decoratorMethodMap = new Map();
/**
 * @deprecated
 */
export const SubscribeTo = (topic: string, obj: any): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = target[propertyKey];
    decoratorMethodMap.set(topic, { originalMethod, target: obj });
    return descriptor;
  };
};
