export type ContractorInfoType = {
    email: string,
    password: string,
    firstName: string,
    surName: string,
    patronymic: string,
    position: string,
    phoneNumber: string
}

export type CompanyInfoType = {
    name: string,
    industry: string,
    companySize: string,
    contractor: ContractorInfoType
}