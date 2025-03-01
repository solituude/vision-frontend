export const registrationServices = (store) => ({
    setCompanyName: (name) => store.name = name,
    setIndustry: (industry) => store.industry = industry,
    setCompanySize: (size) => store.companySize = size,
    setContractorEmail: (email) => store.contractor = {...store.contractor, email},
    setContractorPassword: (password) => store.contractor = {...store.contractor, password},
    setContractorFirstName: (firstName) => store.contractor = {...store.contractor, firstName},
    setContractorSurName: (surName) => store.contractor = {...store.contractor, surName},
    setContractorPatronymic: (patronymic) => store.contractor = {...store.contractor, patronymic},
    setContractorPosition: (position) => store.contractor = {...store.contractor, position},
    setContractorPhoneNumber: (phoneNumber) => store.contractor = {...store.contractor, phoneNumber},
})