import StorageNS from '../src';

describe('StorageNS', () => {
  let s: StorageNS;

  beforeEach(() => {
    s = new StorageNS('test');
  });

  afterEach(() => {
    s.clear();
  });

  it('should create storage with prefix', () => {
    expect(s).toBeInstanceOf(StorageNS);
  });

  it('should throw type error on prefix', () => {
    expect(() => new StorageNS((1 as unknown) as any)).toThrow(TypeError);
  });

  it('should throw error on empty prefix', () => {
    expect(() => new StorageNS('')).toThrow(Error);
  });

  it('should set, get and remove values by keys', () => {
    s.setItem('foo', 'bar');

    const foo = s.getItem('foo');
    expect(foo).toEqual('bar');

    s.removeItem('foo');
    expect(s.getItem('foo')).toEqual(null);
  });

  it('should iterate overs keys properly', () => {
    s.setItem('key1', 'foo');
    s.setItem('key2', 'bar');

    expect([...s.keys()]).toStrictEqual(['key1', 'key2']);
  });

  it('should iterate overs values properly', () => {
    s.setItem('key1', 'foo');
    s.setItem('key2', 'bar');

    expect([...s.values()]).toStrictEqual(['foo', 'bar']);
  });

  it('should clear properly', () => {
    s.setItem('foo', 'bar');
    s.clear();

    const keys = [...s.keys()];
    expect(keys).toStrictEqual([]);
  });

  it('should return keys by indexes', () => {
    s.setItem('foo', 'bar');

    const key = s.key(0);
    expect(key).toEqual('foo');
    expect(s.length).toEqual(1);

    expect(s.key(1)).toEqual(null);
  });

  it('should throw error on incorrect index', () => {
    expect(() => s.key(-1)).toThrow(Error);
  });
});
