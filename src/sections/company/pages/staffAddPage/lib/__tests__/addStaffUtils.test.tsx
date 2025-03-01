import {staffArrayToRequest} from '../addStaffUtils';
import {ROLES} from "../../../../../common/entities/staff";
import {UserType} from "../../lib/types";



describe('staffArrayToRequest function', () => {



    it('должен добавлять companyId, должность и номер телефона', () => {
        const staff: UserType[] = [
            { firstName: "Darya", surName: "Ivanova", email: "ddd@mail.ru", role: ROLES.USER, patronymic: "alex" },
        ];

        // Запускаем тестируемую функцию
        const result = staffArrayToRequest(staff);

        // Ожидаем, что для каждого пользователя были добавлены поля
        expect(result[0].companyId).toBe('2a9af5c7-9018-4e2d-bb4c-6121a5ae9de9');
        expect(result[0].position).toBe('Менеджер');
        expect(result[0].phoneNumber).toBe('89999999999');
        expect(result[0].firstName).toBe("Darya");
        expect(result[0].surName).toBe("Ivanova");

        // expect(result[1].companyId).toBe('12345');
        // expect(result[1].position).toBe('Менеджер');
        // expect(result[1].phoneNumber).toBe('89999999999');
    });
});
