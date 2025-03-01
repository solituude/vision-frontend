import {getFormattedDate} from '../helpers';

describe('getFormattedDate function', () => {

    it('Должен изменять строку даты в вид дд.мм.гггг', () => {
        const test1 = "0001-01-01T00:00:00Z";
        const test2 = "2024-10-30 22:59:47.689912+00"
        const test3 = "";
        const result1 = getFormattedDate(test1);
        const result2 = getFormattedDate(test2);
        const result3 = getFormattedDate(test3);

        expect(result1).toBe("01.01.0001");
        expect(result2).toBe("30.10.2024");
        expect(result3).toBe('--.--.----');
    })
})