interface IContainer {
  bind<T>(inter: Symbol, init: T): void;
  bind<T>(inter: Symbol, init: (resolver: IResolver) => T): void;
}

interface IResolver {
  resolve<T>(clazz: Symbol): T;
}

export class Container implements IContainer, IResolver {
  private registry = new Map();

  public bind<T>(inter: Symbol, init: T | ((resolver: IResolver) => T)): void {
    if (typeof init === "function") {
      this.registry.set(inter, init);
    }
    this.registry.set(inter, init);
  }

  public resolve<T>(clazz: Symbol): T {
    const thing = this.registry.get(clazz);
    if (typeof thing === "function") {
      return thing(this);
    }
    return thing;
  }
}
