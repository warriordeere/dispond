# Missions

Documentation of the Missions API, which is used to retrieve the mission files. It is possible to create, add and then load your own missions.

## Categories

The Categories (paths like `missions/fire/fire_a.json`) are considered best practice. Loading a file using the Missions API would look like this: 
<br/>
```/api/data?file=missions/fire/fire_a.json```

Technically you could also load any mission file that is not included by default and is not using the recommended path like this: 
<br/>
```/api/data?file=your_custom_mission.json```
<br/>
or
<br/>
```/api/data?file=path/to/your/mission/file.json```

## Mission Object Explanaition
Fields marked with ``?`` are not mandatory, all others are required unless otherwise specified.
<br/>

### ``file_type``
Must be ``dispatch/mission``.
<br/>
This field marks the file as an mission file and therefore is strongly mandatory.

### ``type``
Must be a ``string`` starting with ``"DISPATCH_TYPE_"`` to be recognized as a valid mission category.

### ``category`` and ``desc``
Must be a ``string``. Localization is ensured by a combination of [ISO 639](https://www.loc.gov/standards/iso639-2/php/code_list.php) and [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166-1#Codes). Currently only "de-DE" and "en-US" are supported.

### ``attachable_units``
Array of unit types that can be attached to the mission.

## Example File:
*Original file located at: 
``data/missions/fire/fire_a.json``*
```json
{
    "file_type": "dispatch/mission",
    "type": "DISPATCH_TYPE_FIRE_A",
    "category": {
        "de-DE": "B1",
        "en-US": "Fire 1"
    },
    "desc": {
        "de-DE": "Kleinbrand",
        "en-US": "Small Fire"
    },
    "attachable_units": [
        ""
    ]
}
```