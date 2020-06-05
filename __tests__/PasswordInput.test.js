import { calculatePasswordScore } from '../source/components/PasswordInput';

describe('PasswordInput', () => {
  describe('calculatePasswordScore', () => {
    it('returns 0 for empty string', () => {
      expect(calculatePasswordScore('')).toEqual(0);
    });
    it('returns ~0.25 for a insecure password', () => {
      expect(calculatePasswordScore('darko')).toEqual(0.24);
    });
    it('returns ~0.5 for a weak password', () => {
      expect(calculatePasswordScore('darkodarko')).toEqual(0.47);
    });
    it('returns ~0.75 for a good password', () => {
      expect(calculatePasswordScore('Darko_Darko1')).toEqual(0.79);
    });
    it('returns ~1 for a really strong password', () => {
      expect(calculatePasswordScore('Darko_123_Darko#')).toEqual(1);
    });

    describe('entropy factor', () => {
      it('can be used to configure the score strength', () => {
        expect(calculatePasswordScore('darko', 0.02)).toEqual(0.48);
      });
    });
  });
});
