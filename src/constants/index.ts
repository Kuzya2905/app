import { Routes, Permissions } from '@/enums'

export const PROTECTED_ROUTES = {
    [Routes.COMPANY_CREATE] : [Permissions.COMPANY_CREATE],
    [Routes.COMPANY_EDIT] : [Permissions.COMPANY_EDIT],
    [Routes.VACANCY_CREATE] : [Permissions.VACANCY_CREATE],
    [Routes.VACANCY_EDIT] : [Permissions.VACANCY_EDIT]
}