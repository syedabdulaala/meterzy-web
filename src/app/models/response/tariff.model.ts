import { RangedTariff } from "./ranged-tariff.model";
import { FixedTariff } from "./fixed-tariff.model";

export class Tariff {
    id: number = null;
    name: string = null;
    rangedTariffs: RangedTariff[] = [];
    fixedTariffs: FixedTariff[] = [];
}