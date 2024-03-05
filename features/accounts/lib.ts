import { Account as AccountEntity } from "../../services/database/entities";
import { Account } from "./types";

export const mapToModel = (account: AccountEntity): Account => {
    return {
        ...account,
    }

}