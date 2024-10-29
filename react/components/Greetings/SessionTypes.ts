interface Id {
    value: string;
    keepAlive: boolean;
}
interface AccountName {
    value: string;
}

interface Account {
    id: Id;
    accountName: AccountName;
}

interface Channel {
    value: string;
}
interface CountryCode {
    value: string;
}

interface CultureInfo {
    value: string;
}

interface CurrencyCode {
    value: string;
}

interface CurrencySymbol {
    value: string;
}

interface AdminCultureInfo {
    value: string;
}

interface Store {
    channel: Channel;
    countryCode: CountryCode;
    cultureInfo: CultureInfo;
    currencyCode: CurrencyCode;
    currencySymbol: CurrencySymbol;
    admin_cultureInfo: AdminCultureInfo;
}

interface IsAuthenticated {
    value: string;
}

interface Profile {
    isAuthenticated: IsAuthenticated;
}

interface Namespaces {
    account: Account;
    store: Store;
    public: any;
    profile: Profile;
    authentication: any;
}

export interface ISession {
    id: string;
    namespaces: Namespaces;
}
