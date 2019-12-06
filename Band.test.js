const Band = require('./Band');

describe('Band Model', () => {
  describe('drums', () => {
    it('requires drums', () => {
      const band = new Band({
        bass: 'Geezer Butler',
        guitar: 'Toni Iommi',
        can_count_to_four: true
      });
      const { errors } = band.validateSync();
      expect(errors.drums.message).toEqual('Path `drums` is required.');
    });
  });
  describe('canCountToFour', () => {
    it('needs to be able to count to four', () => {
      const band = new Band({
        bass: 'Geezer Butler',
        guitar: 'Toni Iommi',
        drums: 'Bill Ward'
      });
      const { errors } = band.validateSync();
      expect(errors.canCountToFour.message).toEqual('Path `canCountToFour` is required.');
    });
  });
})
;
