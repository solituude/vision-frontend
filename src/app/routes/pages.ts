import {loadable} from "app/lib";
import {lazy} from "react";

export const LoginPage = lazy(() => import("../../sections/auth/pages/loginPage"));

export const RegistrationPage = loadable(() => import("../../sections/auth/pages/registrationPage"), "RegistrationPage");
export const CompanyAccountPage = loadable(() => import("../../sections/company/pages/companyAccountPage/ui/companyAccountPage"),
    'CompanyAccountPage');
export const PlansPage = loadable(() => import('../../sections/company/pages/plansPage/ui/plansPage'), "PlansPage");
export const StaffPage = loadable(() => import('../../sections/company/pages/staffPage/ui/staffPage'), "StaffPage");
export const StaffEditPage = loadable(() => import("../../sections/company/pages/staffEditPage/ui/staffEditPage"),
    "StaffEditPage");
export const StaffAddPage = loadable(() => import('../../sections/company/pages/staffAddPage/ui/staffAddPage'), "StaffAddPage");
export const MainPage = loadable(() => import("../../sections/main/pages/mainPage/ui/mainPage"), "MainPage");
export const MainEditPage = loadable(() => import("../../sections/main/pages/mainEditPage/ui/mainEditPage"), "MainEditPage");
export const DatasetsPage = loadable(() => import('../../sections/datasets/pages/datasetsPage/ui/datasetsPage'), "DatasetsPage");

export const ConnectionsPage = loadable(() => import("../../sections/connections/pages/connectionsPage/ui/connectionsPage"), "ConnectionsPage");
export const NotificationsPage = loadable(() => import("../../sections/notifications/pages/notificationsPage/ui/notificationsPage"), "NotificationsPage");
export const DashboardsPage = loadable(() => import("../../sections/dashboard/pages/dashboardsPage/ui/dashboardsPage"), "DashboardsPage");
export const SupportPage = loadable(() => import("../../sections/support/pages/supportPage/ui/supportPage"), "SupportPage");
export const SettingsPage = loadable(() => import("../../sections/settings/pages/settingsPage/ui/settingsPage"), "SettingsPage");
export const StartPage = loadable(() => import("../../sections/common/pages/startPage/ui/startPage"), "StartPage");
export const ErrorPage = loadable(() => import("../../sections/common/pages/errorPage/ui/errorPage"), "ErrorPage");
export const CreateDatasetPage = loadable(() => import("../../sections/datasets/pages/createDatasetPage/ui/createDatasetPage"),
    "CreateDatasetPage");