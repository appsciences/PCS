describe('List Filters', function() {

    beforeEach(module('csp.directive.listDirective'));

    describe('concat filter', function () {

        it('should concat values with " " ',
            inject(function (nameListFilter) {
                expect(nameListFilter(undefined, ' ')).toBe('');
                expect(nameListFilter([], ' ')).toBe('');
                expect(nameListFilter([{name: 'foo'}, {name: 'bar'}])).toBe('foo, bar');
            }));
    });

    describe('fullName filter', function () {

        it('should concat first and last name with " " ',
            inject(function (fullNameFilter) {
                expect(fullNameFilter(undefined, ' ')).toBe('');
                expect(fullNameFilter({}, ' ')).toBe('');
                expect(fullNameFilter({firstName: 'Buck', lastName: 'Naked'}, ' ')).toBe('Buck Naked');
            }));
    });

    describe('toShortAddress filter', function () {
        it('should create short address',
            inject(function(toShortAddressFilter) {
                // toBe is ===, needs to be same reference
                expect(toShortAddressFilter(undefined)).toBe('');
                expect(toShortAddressFilter({})).toBe('');
                expect(toShortAddressFilter({
                    address: '1 1st St',
                    city: 'New York',
                    zip: '11355',
                    phone: '(555)555-5555'
                })).toBe('1 1st St New York');
            }));
    });

    describe('Office Hourst filter', function () {
        it('should office hours',
            inject(function(officeHoursFilter) {
                // toBe is ===, needs to be same reference
                expect(officeHoursFilter(undefined)).toBe('');
                expect(officeHoursFilter({})).toBe('');
                expect(officeHoursFilter({
                    startTime: new Date('November 30, 2014 09:00:00'),
                    endTime: new Date('November 30, 2014 17:00:00')
                })).toBe('Sun 9:00 AM - 5:00 PM');

            }));
    });
});