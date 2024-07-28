# Dispatch API
Internal API for retrieving the content of dispatch/mission files. The data should be retrieved using the paths listed.

**path:**
```/api/data?file=missions/fire/fire_a.json```

Technically you could also load any file that is not included by default and might not use the recommended path like this: 
<br/>
```/api/data?file=your_custom_mission.json```
<br/>
or
<br/>
```/api/data?file=path/to/your/mission/file.json```

The API returns the file content as json format. An explanation of the respective files can be found in the corresponding documentation.