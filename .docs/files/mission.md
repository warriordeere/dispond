# Mission File

## Categories
The Categories (paths like `missions/fire/fire_a.json`) are considered best practice but are not technically necessary until the data directory.

## Example File:
*Original file located at: 
``data/missions/fire/fire_a.json``*
```json
{
    "file_type": "dispatch/mission",
    "type": "fire_a",
    "category": {
        "de_DE": "B1",
        "en_US": "Fire 1"
    },
    "desc": {
        "de_DE": "PKW-Brand",
        "en_US": "car burning"
    },
    "recommended_unit_set": [
        [
            "vehicle_lf",
            "vehicle_hlf",
            "vehicle_tlf"
        ]
    ],
    "required_loadout": [
        "LOADOUT_ITEM_FOAM_PIPE",
        "LOADOUT_ITEM_FIRE_HOSE"
    ]
}
```

**file_type:** `string` 
<br>
Must be ``dispatch/mission``

**type:** `string`
<br>
Must match the file name.

**category** and **desc**
<br>
Must be an ``object`` consisting of ``string``. Localization is ensured by a combination of [ISO 639](https://www.loc.gov/standards/iso639-2/php/code_list.php) and [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166-1#Codes). Currently only ``de_DE`` and ``en_US`` values are supported.

**recommended_unit_set:** `string[][]`
<br>
An array with unit set combinations, the string within unit sets should comply with existing vehicle types.

**required_loadout:** `string[]`
<br>
An array consisting of valid loadout item types.