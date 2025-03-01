export const staffServices = (store) => ({
    searchStaff: (name: string) => {
        const staff = store.staff;
        store.staff = staff?.filter((user) =>
            user.firstName.toLowerCase().includes(name) || user.secondName.toLowerCase().includes(name) ||
            (user.firstName.toLowerCase() + " " + user.secondName.toLowerCase()).includes(name) || (user.secondName.toLowerCase() + " " + user.firstName.toLowerCase()).includes(name)
        );
    }
})