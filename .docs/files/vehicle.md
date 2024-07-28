# Vehicle File

## Categories
The Categories (paths like `vehicles/engine/engine_a.json`) are considered best practice but are not technically necessary until the data directory.

## Example File:
*Original file located at: 
``data/vehicles/engine/vehicle_hlf.json``*
```json
{
    "file_type": "vehicle/vehicle",
    "type": "vehicle_hlf",
    "category": {
        "de_DE": "HLF-20",
        "en_US": "HLF-20"
    },
    "desc": {
        "de_DE": "Hilfleistungs-Löschgruppenfahrzeug",
        "en_US": "Rescue Engine"
    },
    "perks": {
        "units": 9,
        "extinguishing_cap": 1600,
        "clothing": [
            "CLOTHING_SCBA"
        ],
        "loadout_cap": 6,
        "loadout_items": {
            "item_fire_fighting": [
                "LOADOUT_ITEM_FOAM_PIPE",
                "LOADOUT_ITEM_FIRE_HOSE"
            ],
            "item_assistance": [
                "LOADOUT_ITEM_LEAKKIT_BIG",
                "LOADOUT_ITEM_DOORKIT",
                "LOADOUT_ITEM_TECHKIT"
            ],
            "item_misc": [
                "LOADOUT_ITEM_LIGHTKIT"
            ]
        }
    }
}
```

**file_type:** `string` 
<br>
Must be ``vehicle/vehicle``

**type:** `string`
<br>
Must match the file name.

**category** and **desc**
<br>
Must be an ``object`` consisting of ``string``. Localization is ensured by a combination of [ISO 639](https://www.loc.gov/standards/iso639-2/php/code_list.php) and [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166-1#Codes). Currently only ``de_DE`` and ``en_US`` values are supported.

**perks:** ``VehiclePerksObject``

**VehiclePerksObject:**
<br>
```ts
units: number
extinguishing_cap: number
loadout_cap: number
loadout_items: LoadoutItems
```

**LoadoutItems:**
```ts
item_fire_fighting: ItemFireFightingTypes[]
item_assistance: ItemAssistanceTypes[]
item_misc: ItemMiscTypes[]
```