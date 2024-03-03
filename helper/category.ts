import mccJSON from '../assets/mcc.json'

// Визначення типу для об'єкта з ключами типу string і значеннями типу string
interface ICategyIconsByMccGroup {
    [key: string]: string;
}

interface ICategyIconsByMcc {
    [key: string]: string;
}


const categyIconsByMccGroup: ICategyIconsByMccGroup = {
    'AS': 'agriculture',
    'CS': 'handyman',
    'WSM': 'local_shipping',
    'AL': 'airplanemode_active',
    'CR': 'car_rental',
    'HR': 'hotel',
    'TS': 'directions_bus',
    'US': 'build',
    'SP': 'engineering',
    'ROS': 'shopping-cart',
    'CV': 'directions_car',
    'CLS': 'checkroom',
    'MS': 'food-bank',
    'MTS': 'local_post_office',
    'PS': 'person',
    'BS': 'business_center',
    'RS': 'home_repair_service',
    'ES': 'theaters',
    'PFS': 'account_balance',
    'MO': 'groups',
    'GS': 'account_balance',
    'NC': 'help_outline',
}

const categyIconsByMcc: ICategyIconsByMcc = {
    "5818": "computer",
    "7230": "face-retouching-natural",
    "5993": "smoke-free",
    "7997": "sports"
}
type MccType = { 
    mcc: string;
    group: {
        type: string;
        description: {
            uk: string;
            en: string;
            ru: string;
        };
    };
    fullDescription: {
        uk: string;
        en: string;
        ru: string;
    };
    shortDescription: {
        uk: string;
        en: string;
        ru: string;
    };
} | undefined

export const Category = {
    getCategryIconByMcc: (mcc: string): string | undefined => {

        const data: MccType = mccJSON.find(el => el['mcc'] == mcc);

        console.log(data);

        if (!data) return 'help-outline';

        if (categyIconsByMcc.hasOwnProperty(mcc)) {
            return categyIconsByMcc[mcc];
        }
        const iconKey = data.group.type;
        if (categyIconsByMccGroup.hasOwnProperty(iconKey)) {
            return categyIconsByMccGroup[iconKey];
        } else {
            return 'defaultIcon';
        }
    }
} 