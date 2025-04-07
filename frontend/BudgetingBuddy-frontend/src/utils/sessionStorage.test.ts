import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { loadFromSessionStorage, saveToSessionStorage } from './sessionStorage';

describe('Session Storage Utilities', () => {
  // Mock session storage
  const mockSessionStorage = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => {
        return store[key] || null;
      }),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      clear: vi.fn(() => {
        store = {};
      })
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockSessionStorage.clear();
  });

  describe('loadFromSessionStorage', () => {
    it('should load and parse data from session storage', () => {
      mockSessionStorage.setItem('testKey', JSON.stringify({ foo: 'bar' }));
      

      const result = loadFromSessionStorage('testKey', { default: true });
      

      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('testKey');
      expect(result).toEqual({ foo: 'bar' });
    });

    it('should return initialState when key does not exist', () => {
      // Execute
      const initialState = { default: true };
      const result = loadFromSessionStorage('nonExistentKey', initialState);
      

      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('nonExistentKey');
      expect(result).toBe(initialState);
    });

    it('should return initialState when JSON parsing fails', () => {
      mockSessionStorage.setItem('invalidJson', 'not valid json');
      

      const initialState = { default: true };
      const result = loadFromSessionStorage('invalidJson', initialState);
      

      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('invalidJson');
      expect(result).toBe(initialState);
    });
  });

  describe('saveToSessionStorage', () => {
    it('should stringify and save data to session storage', () => {

      const data = { foo: 'bar' };
      saveToSessionStorage('testKey', data);
      

      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(data));
    });

    it('should handle errors when saving fails', () => {

      mockSessionStorage.setItem.mockImplementationOnce(() => {
        throw new Error('Storage quota exceeded');
      });
      

      const consoleSpy = vi.spyOn(console, 'error');
      

      saveToSessionStorage('testKey', { foo: 'bar' });
      

      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});