export class Tariff {
    id: number = null;
    name: string = null;
    rangedTariffs: RangedTariff[] = [];
    fixedTariffs: FixedTariff[] = [];
}

export class RangedTariff {
    id: number = null;
    name: string = null;
    upperLimit: number = null;
    lowerLimit: number = null;
    charges: number = null;
    unitType: UnitType = null;
}

export class FixedTariff {
    id: number = null;
    name: string = null;
    charges: number = null;
    unitType: UnitType = null;
}

enum UnitType {
    Percent = 1,
    Raw = 2
}

enum Strategy {
    TopToBottom = 1,
    BottomToTop = 2
}