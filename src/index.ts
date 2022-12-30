export class StorageNS implements Storage {
  constructor(
    public readonly prefix: string,
    public readonly storage: Storage = localStorage
  ) {
    if (typeof prefix !== 'string') {
      throw new TypeError('Type of prefix is ' + typeof prefix);
    }

    if (!prefix) {
      throw new Error('Empty string prefix');
    }
  }

  private addPrefix = (key: string) => `${this.prefix}:${key}`;

  private removePrefix = (key: string) => key.replace(`${this.prefix}:`, '');

  /**
   * Returns value by key or null if it doesn't exist
   */
  public getItem = (key: string): string | null => {
    const prefixed = this.addPrefix(key);

    return this.storage.getItem(prefixed);
  };

  /**
   * Sets value by key
   */
  public setItem = (key: string, value: string): void => {
    const prefixed = this.addPrefix(key);

    this.storage.setItem(prefixed, value);
  };

  /**
   * Removes value by key if it is associated
   */
  public removeItem = (key: string): void => {
    const prefixed = this.addPrefix(key);

    this.storage.removeItem(prefixed);
  };

  /**
   * Enables iterating over storage with key/value tuple
   */
  *[Symbol.iterator](): IterableIterator<[string, string | null]> {
    for (const key of this.keys()) {
      const value = this.getItem(key);

      yield [key, value];
    }
  }

  /**
   * Iterates over existing keys
   */
  public *keys(): IterableIterator<string> {
    for (let i = 0; i <= this.storage.length; i++) {
      const key = this.storage.key(i);

      if (key?.startsWith(this.prefix)) {
        yield this.removePrefix(key);
      }
    }
  }

  /**
   * Iterates over stored values
   */
  public *values(): IterableIterator<string | null> {
    for (const key of this.keys()) {
      yield this.getItem(key);
    }
  }

  /**
   * Returns number of stored keys
   */
  public get length(): number {
    return [...this.keys()].length;
  }

  /**
   * Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs.
   */
  public key = (i: number) => {
    if (i < 0) {
      throw new Error('Key index must be greater or equal to zero');
    }

    return [...this.keys()][i] || null;
  };

  /**
   * Deletes all stored data
   */
  public clear = (): void => {
    [...this.keys()].forEach(this.removeItem);
  };
}

export default StorageNS;
