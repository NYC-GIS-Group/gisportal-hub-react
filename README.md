### Summary
A linking and authentication application for use with ESRI ArcGIS Portal and webapp builder.

### Deployment
Runs as a front-end app on giswebapps1. Served through IIS as a virtual folder named 'GISPortalV3'

### Running
Install node.js...
```sh
$ npm install
$ bower install
$ npm start
```
### Notes
Configuration can be found here: \\giswebapps1\wwwroot\GISPortal_config\modConfig.xml
* Designed for Internet Explorer due to ActiveX scripting (to retrieve logged in user).  Other browsers will not be able to access restricted-use maps.

#### modConfig.xml
Standing up a new tab:
1. Create a new web app in ESRI Portal (web app builder)
2. Once created, navigate to the app's description page, find the'URL' property:
http://ags10dev2.oem.nycnet/portal/apps/webappviewer/index.html?id=f9b54b70d104412bad3764e18e359dab <-- we only want the sequence of characters after 'id=' (f9b54b70d104412bad3764e18e359dab)
3. Open the portal's config document: \\giswebapps1\wwwroot\GISPortal_config\modConfig.xml
4. Create a new module element following the pattern in the document
5. If this is a tab meant for everyone to view, enter 'STD' as the appCode. If the audience for the tab is limited, create a unique 3 or 4 character identifier for the new tab. You will need to take the additional step of creating a new app in AppsAdmin (https://github.com/NYC-GIS-Group/AppsAdmin)
6. Take the code you copied in step 2 and assign it to the mapId
7. Save the document and refresh GIS Portalv3
8. The new tab should be visible on the navigation bar or (if it's a private tab), under 'private tabs'
(see the next section for user cofiguration)


#### User configuration for private tabs
In order to see private tabs on the GIS Portal v3:
1.	Open IE, click the gear icon on the top-right -> go to ‘internet options’
2.	Click the tab for ‘Security’
3.	Click ‘Custom level…’
4.	Scroll down the list, about 1/4 down
5. Find 'Initialize and script ActiveX controls not marked as safe..."
5.	Tick ‘Enable’ for the highlighted item (see below)
6.	Confirm ‘OK’ for all dialog boxes and close IE

Note: private tabs can be navigated to directly. Permissions only affect the rendering of links on the navigation bar.




