var currentLocation = null;
var loc_string = null;
var radius = null;
var arr = new Array();
var db = null;
var height = null;

document.addEventListener("deviceready", onDeviceReady, false); //Device ready listener fires cordova is ready to function

function onDeviceReady() 
{
    db = openDatabase("tree_db", "1.0", "Colorado Tree Coalition DB", 200000); //open db
    height = ($(window).height() - $("#footer").height());
    $("#map_canvas").height(height);
    
    first_run(db);
    db.transaction(queryDB, errorCB);
    radius = localStorage.alertRadius;
    //showUserlocation();
}
//Populate the database 
//
function populateDB(tx) {
     tx.executeSql('DROP TABLE IF EXISTS TREES');
     tx.executeSql('CREATE TABLE IF NOT EXISTS TREES (id unique, BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes)');            
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (1, "Malus species", "Common Apple", 35, 41, 36, 159.9, 39.864014, -105.070195, "1T", "NW Corner of 92nd & Pierce")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (2, "Prunus mandshurica", "Apricot", 36, 40, 33, 161.29, 40.013252, -105.283393, "1T","9th st. & Arapahoe")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (3, "Prunus mandshurica", "Apricot", 39, 25, 43, 158.21, 38.442094, -105.011455, "1T", "425 I street")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (4, "Fagus sylvatica", "Cutleaf European Beech", 3.20, 17, 10, 29.55, 39.788291, -105.032752, "1", "Regis/SW corner of Science Bldg")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (5, "Fagus sylvatica", "European Weeping Beech", 5.7, 16, 16, 37.90, 39.788291, -105.032752, "2", "Regis/NW corner of Carroll Hall")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (6, "Fagus sylvatica", "Tri-Color Beech", 9.4, 25, 24, 60.52, 39.731993, -104.960117, "2", "Denver Botanic Gardens/Morrison Center Garden")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (7, "Betula nigra", "River Heritage Birch", 6.9, 23, 30, 52.17, 39.788291, -105.032752,"1", "Regis/North of oSullivan Center")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (8, "Aesculus glabra", "Ohio Buckeye", 29, 47, 49, 150.31, 38.846711, -104.834391, "1", "Near center of park")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (9, "Aesculus glabra", "Ohio Buckeye", 27.90, 47, 28, 141.61, 39.670129, -104.98272,"2T", "")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (10, "Aesculus glabra", "Ohio Buckeye", 24.10, 54, 38, 139.17, 40.58775, -105.111035, "2T", "Grandview Cemetery/60 yards N of office")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (11, "Aesculus octandra", "Yellow Buckeye", 35.50, 73, 48, 196.47, 39.703803, -104.968862, "1", "Washington Park/SW corner of Franklin & Exposition")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (12, "Aesculus octandra", "Yellow Buckeye", 29.30, 81, 41, 183.25, 40.0102, -105.273324, "2", "CU campus/ West of Mackey Auditorium")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (13, "Aesculus octandra", "Yellow Buckeye", 29.20, 71, 41, 172.94, 39.692893, -104.967359, "3", "South High School/ South sideyard")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (14, "Aesculus octandra", "Yellow Buckeye", 26.60, 58, 44, 152.52, 39.677957, -104.960713, "4", "DU Campus/SW corner of Mary Reed Bldg")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (15, "Shepherdia arentea", "Silver Buffaloberry", 9.10, 27, 14, 59.07, 39.604983, -105.021771, "1", "Hudson Gardens/unusual tree garden")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (16, "Cedrus libani", "Cedar of Lebanon", 6.80, 34, 16, 59.35, 39.676039, -104.9625556, "2", "Hudson Gardens/unusual tree garden")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (17, "Cedrus libani", "Cedar of Lebanon", 5.10, 20, 12, 39.01, 39.731993, -104.960117, "3", "Denver Botanic Gardens/Scripture Garden")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (18, "Cedrus atlantica", "Blue Atlas Cedar", 7.50, 26, 13, 52.80, 39.788291, -105.032752, "3T", "Regis/ North of Loyola Hall")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (19, "Prunus serotina", "Black Cherry", 34.10, 73, 51, 192.82, 39.706955, -104.973311, "1", "Washington Park/Across from 525 Downing St.East of Driveway")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (20, "Castanea dentata", "American Chestnut", 20.20, 42, 22, 110.93, 40.01379, -105.267938, "1", "American Chestnut")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (21, "Chilopsis tashkentensis", "Chitalpa", 4.30, 17, 17, 34.75, 39.04855, -108.52993, "1", "West Side of intersection")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (22, "Prunus maackii", "Amur Chokecherry", 12, 27, 30, 72.18, 39.788291, -105.032752, "1", "Regis/ West side of Regis Chapel")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (23, "Gymnocladus dioicus", "Kentucky Coffeetree", 43.60, 87, 61, 239.15, 38.26392, -104.653495, "1", "City Park/ across from fountain")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (24, "Gymnocladus dioicus", "Kentucky Coffeetree", 37.40, 71, 69, 205.69, 39.698485, -104.969071, "2", "Washington Park/80 yards W of Tennessee Ave and Franklin St")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (25, "Cupressus bakeri", "Modoc Cypress", 15.30, 35, 19, 87.79, 39.731993, -104.960117, "1", "Denver Botanic Gardens/Rock Alpine Garden south edge")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (26, "Chamaecyparis nootkatensis", "Weeping Alaskan False Cypress", 7.1, 26, 19, 53.04, 39.731993, -104.960117, "2", "Denver Botanic Garndes/Rock Alpine Garden West edge")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (27, "Cornus kousa", "Japanese Dogwood", 5.30, 11, 12, 30.64, 39.731993, -104.960177, "1", "Waring House Garden")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (28, "Sambucus nigra", "Black Elder", 8.60, 31, 19, 62.75, 39.731993, -104.960117, "1", "Denver Botanic Gardens/Birds and Bees Garden")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (29, "Ulmus americana", "American Elm", 61, 90, 105, 307.79, 40.587253, -105.088708, "2T", "714 W. Mountain Ave")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (30, "Ulmus davidiana", "Japanese Elm", 14.30, 45, 28, 96.90, 39.731993, -104.960117, "1", "Denver Botanic Gardens/ Cutting Garden")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (31, "Ulmus rubra", "Red Elm", 50.80, 76, 93, 258.76, 40.586629, -105.086267, "1", "105 S. Whticomb st.")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (32, "Ulmus thomasii", "Rock Elm", 36.60, 87, 78, 221.42, 40.578034, -105.078017, "2", "CSU Campus/5th tree west of College Ave on Laurel Ave")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (33, "Corylus colurna", "Turkish Filbert", 15.20, 51, 26, 105.23, 39.731993, -104.960117, "2", "Denver Botanic Gardens/Waring House Garden")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (34, "Abies homolepis", "Nikko Fir", 8.90, 30, 23, 63.70, 39.731993, -104.960117, "1", "Denver Botanic Gardens/Birds and Bees Garden")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (35, "Ginkgo biloba", "Ginkgo", 24.5, 58, 37, 144.18, 39.741164, -104.955737, "2T", "East High Shcool/ South Courtyard")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (36, "Ginkgo biloba", "Ginkgo", 18.30, 54, 32, 119.46, 39.692733, -104.966887, "2T", "South High Shcool/ NW corner of bldg")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (37, "Koelreuteria paniculata", "Goldenrain Tree", 30, 40, 35, 142.95, 39.731993, -104.960117, "1", "Denver Botanic Gardens/Picnic Garden")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (38, "Celtis laevigata", "Sugar Hackberry", 44, 72, 76, 229.16, 39.738861, -104.986336, "1", "Civic Center Park/15 yds N. of Lincoln st. and 14th ave")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (39, "Crataegus mollis", "Downy Hawthorn", 32.10, 25, 50, 138.29, 39.731413, -104.965197, "1T", "South of parthenon, 100ft west of port-o-let enclosure")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (40, "Crataegus mollis", "Downy Hawthorn", 30.20, 34, 40, 138.83, 39.729595, -104.967206, "1T", "50ft north of south road, across from Gilpin st")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (41, "Gleditsia tricanthos", "Thorned Honeylocust", 45.10, 84, 68, 242.61, 39.736486, -10496457, "1", "NE corner")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (42, "Gleditsia tricanthos inermis", "Thornless Honeylocust Pincushion", 10.5, 43, 23, 81.72, 39.731993, -104.960117, "1", "Denver Botanic Gardens/ Picnic Garden")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (43, "Ostrya virginiana", "American Hophornbeam", 8.8, 36, 25, 69.88, 39.731993, -104.960177, "1", "Denver Botanic Gardens/Waring House")');
     tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (44, "Carpinus caroliniana", "American Hornbeam", 9.8, 29, 27, 66.52, 39.731993, -104.960117, "1", "Denver Botanic Gardens/Waring House")');
    
    //**************************************************************************
    //NEW DATA
    //data set #2
    //
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (45, "Alnus tenuifolia", "Mountain Alder", 10.6, 46, 30, 86.78, 39.611699, -105.010672, "2T", "5783 S. Prescott St. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (46, "Prunus dulcis", "Almond", 3.4, 24, 26, 41.8, 40.41165, -104.713966, "1", "1724 22nd ave. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (47, "Malus species", "Common Apple", 32.5, 45, 50, 159.55, 39.741873, -104.949684, "1T", "1586 Steele st  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (48, "Malus species", "Jonathan Apple", 14, 40, 44, 94.46, 40.575685, -105.066035, "1T", "706 Locust st private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (49, "Prunus mandshurica", "Apricot", 30, 32, 37, 136.05, 40.57737, -105.070673, "3", "North of Church")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (50, "Thuja occidentalis", "Arborvitae", 15.9, 46, 24, 101.93, 40.164969, -105.110664, "1", "1126 3rd ave private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (51, "Fraxinus nigra", "Black Ash", 37.6, 76, 57, 208.31, 40.163383, -105.110208, "1", "230 Gay St. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (52, "Fraxinus quadrangulata", "Blue Ash", 29.5, 65, 35, 166.38, 39.699828, -104.968411, "1T", "918 South Franklin St. private residence all 3 trees top 3 on list")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (53, "Fraxinus excelsior", "European Ash", 45.5, 48, 61, 206.12, 39.925358, -105.076037, "1", "480 W. 6th Ave private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (54, "Fraxinus excelsior", "European Ash", 28.5, 42, 58, 145.99, 39.895469, -104.992095, "3", "10957 Melody Dr. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (55, "Fraxinus pennsylvanica", "Green Ash", 50.7, 94, 63, 268.95, 40.577538, -105.072227, "2T", "711 Peterson st. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (56, "Fraxinus pennsylvanica", "Green Ash", 47, 106, 68, 270.58, 40.01367, -105.271326, "2T", "1805 Marine st. 3rd tree in ROW")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (57, "Fraxinus anomala", "Singleleaf Ash", 17.20, 35, 28, 96.01, 38.660364, -108.958302, "1", "W. side of Hwy. 141, S. of Gateway about 2 mi. on the Dolores River BLM")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (58, "Fraxinus americana", "White Ash", 64.30, 69, 72, 288.9, 38.902483, -107.923961, "1", "210 N. Grand Mesa Dr. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (59, "Fraxinus americana", "White Ash", 44.5, 59, 45, 209.98, 40.028083, -105.27785, "4", "1407 Cedar Ave  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (60, "Populus grandidentatum", "Bigtooth Aspen", 21.30, 56, 56, 136.88, 39.987357, -104.812902, "1T", "25 N. 8th St.  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (61, "Populus tremuloides", "Quaking Aspen", 38.7, 91, 37, 221.77, 37.403551, -108.147527, "1T", "From Mancos go E.on Hwy.160 to CR 44, go N. .9 mi. to CR L becomes FR 567. Less than 20ft S. of Rito Alto Trail,about 1 mi.from Trail Head ")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (62, "Taxodium distichum", "Baldcypress", 24.5, 56, 43, 143.68, 40.420454, -104.731745, "1T", "1121 32nd Ave.  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (63, "Taxodium distichum", "Baldcypress", 23.50, 66, 33.5, 148.17, 38.445609, -105.239486, "1T", "8th and Rudd Ave. NW corner")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (64, "Sorbus aria", "Swedish Beamtree", 37.4, 51, 51, 181.19, 40.581648, -105.071784, "1", "430 Peterson St  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (65, "Fagus sylvatica", "Copper Beech", 39, 55, 56, 191.46, 39.721623, -104.969634, "1", "375 Humboldt st. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (66, "Fagus sylvatica", "Copper Beech", 33.5, 48, 46, 164.69, 39.720231, -104.97079, "2", "1333 E. 3rd Ave. House built by Frank Lloyd Wright  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (67, "Fagus sylvatica (Riversii) ", "Copper Rivers Beech", 6.10, 23, 18, 46.65, 39.775515, -105.012528, "1", "4303 Umatilla st.  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (68, "Fagus sylvatica", "Weeping European Beech", 10.2, 32, 24, 70.03, 39.747537, -104.937614, "1T", "4255 Montview Blvd.  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (69, "Fagus sylvatica", "European Beech", 30.2, 75, 61, 185.08, 39.737463, -104.978179, "1", "St. Johns Episcopal Cathedral")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (70, "Betula papyrifera", "Paper Birch", 8.9, 39, 26, 73.45, 39.987739, -105.313966, "1T", "1.5 miles up Long Canyon Trail/Flagstaff Mtn. top 3 trees of this species are all at this location")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (71, "Betula nigra", "River Birch", 21.8, 49, 50, 129.95, 40.425289, -104.730174, "1T", "3023 w. 8th st.Rd   private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (72, "Betula nigra", "River Birch", 21.4, 51, 56, 132.20, 39.710086, -105.004084, "1T", "St. Rose of Lima Catholic Church")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (73, "Betula occidentalis", "Western River Birch", 6.1, 25, 31, 51.9, 40.353534, -105.582819, "1", "Rocky Mtn. N.P. along Big Thompson River in Moraine Park")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (74, "Acer negundo", "Box Elder", 77.5, 75, 78, 337.85, 38.802596, -107.970995, "1T", "10230 2100 Rd  #1 and #2 same location")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (75, "Acer negundo Variegatum", "Variegated Boxelder", 16.9, 32, 33, 93.32, 39.669871, -105.038552, "1", "2618 S. Paton Ct.  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (76, "Juglans cinerea", "Butternut", 45.3, 66, 73, 226.49, 40.572244, -105.071036, "1", "418 Edwards St. SE of house frontyard private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (77, "Juglans cinerea", "Butternut", 47, 56, 60, 218.58, 40.589194, -105.093099, "2", "934 Laporte Av. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (78, "Juglans cinerea", "Butternut", 32.7, 44, 50, 159.18, 40.39565, -105.070742, "3", "447 E. 4th  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (79, "Catalpa ovata", "Chinese Catalpa", 12, 43, 31, 88.43, 39.723379, -104.976339, "1", "444 S. Emerson St. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (80, "Catalpa speciosa", "Northern Catalpa", 56.2, 88, 64, 280.47, 38.456611, -105.240532, "3", "NW Corner Barr and 8th st.  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (81, "Catalpa bignonioides", "Umbrella Catalpa", 31.8, 23, 35, 131.6, 39.084564, -108.558521, "1", "841 Orchard Ave. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (82, "Calocedrus decurrens", "Incense Cedcar", 17.7, 42, 21, 102.83, 39.072229, -108.548419, "2", "1421 Chipeta Av. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (83, "Cedrus libani", "Cedar of Lebanon", 21, 45, 34, 119.44, 39.673286, -104.958609, "1", "2395 E Wesley Ave best seen from alley to the west  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (84, "Prunus avium", "Red Sweet Cherry", 13, 32, 28, 79.82, 39.735667, -104.972898, "1", "1226 Downing St private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (85, "Castanea dentata", "American Chesnut", 10.6, 29, 32, 70.28, 39.734981, -104.946849, "2", "1168 Cook St. sideyard next to garage   private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (86, "Populus acuminata", "Lanceleaf Cottonwood", 78.6, 99, 103, 371.55, 40.586975, -105.106817, "1T", "SW Corner of Mountain Ave.and Bryan, E of Housing Authority")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (87, "Populus sargentii", "Plains Cottonwood", 121.2, 68, 69, 465.82, 40.418786, -105.072424, "2", "behind business in parking lot")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (88, "Pseudotsuga menziesii", "Douglas-Fir", 65, 163, 53, 380.35, 37.493185, -107.885886, "1", "From Durango go N. on Hwy. 550 ≈ 10 mi. to Hermosa. Turn onto CR 201 2.2 mi. becoming FS 576. Go 1.3 mi. to Lower Hermosa Cr. Trailhead, TR 514 Hike to intersect w/ Dutch Cr. Trail(TR 516). Hike≈ .5 mi. to Bondurant Trail(no signs),Go left to drop down to cross Dutch Cr. along cattle trail short distance to tree.")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (89, "Pseudotsuga menziesii", "Douglas-Fir", 82.5, 90, 62, 364.55, 38.495777, -106.171114, "2", "USFS, W. on Hwy. 50 about 2 mi., S. on CR 210 for 1.3 mi., take R. fork for Pass Creek on CR 212 for about 2.5 mi.At top of road look for windmill to W. of road. From windmill, follow fence for about 1/4 mi. ")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (90, "Ulmus americana", "American Elm", 65, 110, 107, 342.42, 39.719983, -104.933719, "1", "200 Cherry St. frontyard north tree  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (91, "Ulmus americana", "American Elm", 66.60, 75, 106, 310.62, 40.25331, -103.808846, "2T", "tree in backyard but can be viewed from front street  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (92, "Ulmus glabra", "Camperdown Elm", 27.5, 14, 25, 106.6, 40.581336, -105.072181, "2", "NE corner of firestation")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (93, "Ulmus glabra", "Camperdown Elm", 26.1, 29, 32, 118.95, 37.345175, -108.297188, "1", "650 W. Grand Ave. can be viewed from road  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (94, "Ulmus procera", "English Elm", 55.7, 94, 70, 286.4, 38.057737, -103.71649, "1", "715 N. Main st private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (95, "Ulmus parvifolia", "Lacebark Elm", 23.8, 59, 55, 147.48, 38.055942, -103.72261, "1", "609 W. Swink Ave private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (96, "Ulmus pumila", "Siberian Elm", 81.5, 85, 94, 364.41, 39.039289, -108.459255, "1", "frontyard of house 236 32 road  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (97, "Ulmus pumila", "Siberian Elm", 68.40, 98, 105, 339.03, 40.582527, -105.09281, "2T", "508 Gordon St. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (98, "Corylus colurna", "Turkish Filbert", 18.6, 55, 30, 120.9, 40.005387, -105.282737, "1", "982 Grant Pl. street tree  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (99, "Abies concolor", "White Fir", 52.1, 142, 33, 313.84, 37.431531, -106.879317, "1T", "15 mi. N. of Pagosa Springs on Hwy. 160 go to the West Fork Campground Continue ≈ .5 mi. N. to the Windy Pass Trailhead. Walk ≈ .7 mi., tree on right")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (100, "Celtis occidentalis", "Hackberry", 45.8, 99, 56, 256.81, 39.748589, -104.939535, "1T", "2059 Albion St. frontyard  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (101, "Crataegus crus-galli", "Cockspur Hawthorn", 11.4, 23, 26, 65.3, 39.694623, -104.952497, "1T", "1205 S. Milwaukee St.  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (102, "Crataegus laevigata", "Pauls Scarlet Hawthorn", 16, 44, 43, 104.99, 39.080916, -108.557792, "1", "863 Elm Ave.  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (103, "Carya ovata", "Shagbark Hickory", 26.4, 73, 53, 169.15, 40.39577, -105.062023, "1", "1157 E. 4th Street brought from Missouri #1 and #2 both at this site frontyard  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (104, "Carya laciniosa", "Shellbark Hickory", 19.4, 40, 41, 111.17, 40.008775, -105.262949, "1", "St. Aidans Episcopal Church N. side of parking lot ")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (105, "Ptelea trifoliata", "Common Hoptree/Wafer Ash", 5.3, 18, 21, 39.89, 39.900579, -105.036326, "1", "Front Range community College E. of main entrance next to utility enclosure")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (106, "Tilia americana", "American Linden", 61, 75, 69, 283.79, 40.252297, -103.792431, "1", "508 Sherman st. south of house  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (107, "Tilia cordata", "Littleleaf Linden", 48.2, 96, 42, 257.85, 39.706271, -104.89906, "1", "Fairmount Cemetery block 14")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (108, "Tilia tomentosa", "Silver Linden", 20.7, 53, 36, 127, 39.984014, -105.070195, "1", "167 S. 4th in ROW  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (109, "Robinia pseudoacacia", "Black Locust", 55.20, 76, 53, 262.58, 37.27134, -107.879026, "1", "721 E. 3rd Ave  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (110, "Acer platanoides", "Norwa Maple", 40.1, 79, 58, 219.41, 40.5873, -105.099099, "1", "1212 West Mountain ROW tree  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (111, "Acer rubrum", "Red Maple", 23.20, 66, 48, 150.85, 40.020294, -105.285096, "1", "840 Mapleton Ave. E. side of Elem. School")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (112, "Acer saccharinum", "Silver Maple", 84.7, 73, 100, 363.96, 40.215029, -105.268223, "1", "330 Bradford St. Turn off of S. St. Vrain Hwy. on to Old S. St.Vrain Rd, L. on CR 069 to the T, R. 2 blks., L. at the white picket fence to the end  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (113, "Sorbus aucuparia", "European Mountain-Ash", 23, 40, 37, 121.47, 39.76066, -105.046248, "1T", "4545 W. 30th Av. N side along Vrain st private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (114, "Quercus macrocarpa", "Bur Oak", 63.2, 84, 94, 305.95, 40.401379, -105.084765, "1", "605 W. 9th on alley  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (115, "Quercus prinus", "Chestnut Oak", 35.4, 60, 61, 186.41, 39.999862, -105.281674, "1T", "Chautauqua Park North side of park")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (116, "Quercus robur", "Columnar English Oak", 26.2, 73, 28, 162.27, 39.732075, -104.965238, "1", "Cheeseman Park south of parthenon NW tree")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (117, "Quercus robur", "English Oak", 54.2, 96, 88, 288.19, 39.733102, -104.947223, "1", "1042 Cook St. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (118, "Quercus lyrata", "Overcup Oak", 43.9, 75, 73, 231.1, 38.234063, -104.435029, "1", "E. of Vineland, on Jersey Rd., between 38th & 39th Ln. south side of vacant lot")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (119, "Quercus palustris", "Pin Oak", 38.5, 78, 65, 215.14, 40.011529, -105.257798, "1", "2802 Cordry Ct. private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (120, "Quercus rubra", "Northren Red Oak", 52.3, 88, 81, 272.47, 39.760477, -105.039446, "1T", "4001 W. 30th Ave. frontyard  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (121, "Quercus rubra", "Northren Red Oak", 55.7, 80, 86, 276.40, 39.999258, -105.266035, "1T", "2121 Columbine Ave  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (122, "Quercus imbricaria", "Shingle Oak", 30.9, 65, 65, 178.28, 39.990685, -105.227984, "1", "215 Cimmaron Way  private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (123, "Quercus shumardii", "Shumard Oak", 48.5, 77, 74, 247.79, 39.802379, -105.094999, "2T", "In parking lot")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (124, "Quercus bicolor", "Swamp White Oak", 38.5, 78, 70, 216.39, 39.995058, -105.268408, "1", "near entrance of Green Mountain Cemetery")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (125, "Quercus alba", "White Oak", 41.5, 75, 80, 225.31, 40.008742, -105.262947, "1", "St. Aidans Episcopal Church")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (126, "Pyrus communis", "Common Pear", 34.5, 45, 42, 163.83, 39.870986, -105.053483, "1", "NW Corner")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (127, "Pyrus communis", "Common Pear", 24.5, 45, 28, 128.93, 39.960737, -104.75996, "2T", "Behind the Rocky Mountain Bird Observatory building")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (128, "Pinus nigra", "Austrian Pine", 46.5, 76, 65, 238.26, 40.417684, -104.692517, "1", "NW corner Meeker House Museum")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (129, "Platanus x acerifolia", "London Planetree", 35, 86, 79, 215.65, 39.073512, -108.551917, "1", "Lincoln Park NE corner of 12th and Gunnison ave.")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (130, "Platanus x acerifolia", "London Planetree", 34.1, 76, 64, 199.07, 39.782586, -104.981055, "2", "4746 Pennsylvania St private residence")');
    tx.executeSql('INSERT INTO TREES (id,BotName, ComName, DBH, Height, CrownSpread, Points, latitude, longitude, rank, notes) VALUES (131, "Cotinus obovatus", "American Smoketree", 16.8, 20, 17, 77, 39.759542, -105.055452, "1", "2922 Benton St  private residence")');
    //
    //********************************************************************************
    
}

    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    

//creates the database if this is the first run of the app
//
function first_run(db) 
{
	var firstRun = localStorage.FirstRun;
	if(firstRun == null) //check if this is the first run
	{
		db.transaction(populateDB, errorCB, successCB); //Create the db
		localStorage.FirstRun = false;
		localStorage.alertRadius= 380;
		radius=localStorage.alertRadius;
	}
}
//Transaction success callback
//
function successCB()
{
    
}

// Transaction error callback
//
function errorCB(err)
{
    alert("Error processing SQL: "+err.code);
}
//Select everything from the Trees database
//
function queryDB(tx)
{
    tx.executeSql('SELECT * FROM TREES', [], querySuccess, errorCB);
}

function queryER()
{
    alert("Query Error");
}

//Push the query results to a global variable so other functions can access them without being passed them
function querySuccess(tx,results)
{
    getLocation(results); //get location which calls draw map, distance and plot points
}

function getLocation(res)
{
    $.mobile.loading( 'show', {
        text: 'loading map',
        textVisible: true,
        html: ""
    });
    navigator.geolocation.getCurrentPosition(function(pos)
    {
        currentLocation = {longitude:pos.coords.longitude, latitude:pos.coords.latitude};
        draw_map(res);
    }
    , function(err)
    {
        draw_map(res);
        if (watchID != null) 
        {
            navigator.geolocation.clearWatch(watchID);
            watchID = null;
        }
        alert("Sorry, but we couldn't find your location.");
    }
    ,{maximumAge: 10000,timeout: 10000,enableHighAccuracy:true});
    
    
}

function draw_map(res)
{
    if(currentLocation != null)
    {
        loc_string = currentLocation.longitude + ", " + currentLocation.latitude;

        var yourStartLatLng = new google.maps.LatLng(currentLocation.longitude, currentLocation.latitude);
        $.mobile.loading( 'hide');
        $('#map_canvas').gmap({'zoom':8, 'center': loc_string});
        //alert("Made It past map");
        plot_points(res);
        //alert("made it past plot");
        
    }
    else
    {
        $.mobile.loading( 'hide');
        var yourStartLatLng = new google.maps.LatLng(39.079583, -108.554097);
        $('#map_canvas').gmap({'zoom':8, 'center': '39.079583, -108.554097'});
        alert("Sorry Treefinder cannot function without your Current Location, turn on your gps and try again");
    }
}


function plot_points(res)
{
    var len = res.rows.length;
    var $marker= {
            show:null,
            content:null,
            location:null
    };
    
    for (var j=0; j<len; j++){
        $marker.location = res.rows.item(j).latitude+","+res.rows.item(j).longitude; //put lat + long in a comma delimited string 
        $marker.content =  '<div style="padding: 0px; text-align:left; font-size:11px;" align="left">'
                            +'<p><b>Name:   </b>'+res.rows.item(j).ComName+'</p><p><b>Bot. Name:   </b>'
                            +res.rows.item(j).BotName + '</p><p><b> DBH:   </b>'+ res.rows.item(j).DBH
                            +'</p><p><b> Height:   </b>'+ res.rows.item(j).Height +'</p><p><b> Crown Spread:   </b>'
                            + res.rows.item(j).CrownSpread +'</p><p><b> Points:   </b>'+ res.rows.item(j).Points
                            +'</p><p><b> Rank:   </b>'+ res.rows.item(j).rank +'</p><p><b> Notes:   </b>'+ res.rows.item(j).notes +'</p></div>';
        arr[j]=[
                $marker.content
                ];
    }
    
    for (var i=0; i<len; i++)
    {
        //Check that the points are in our radius and only plot the ones that are
        var dist = distance(res.rows.item(i).latitude, res.rows.item(i).longitude);
        if(dist < radius)
        {
            $marker.location = res.rows.item(i).latitude+","+res.rows.item(i).longitude; //put lat + long in a comma delimited string             
            $marker.show=$('#map_canvas').gmap('addMarker', {id: i,'position': $marker.location,'icon': "images/tree.png", 'bounds': true});
            var test= $marker.show;
            $('#map_canvas').gmap('addMarker', {id: i,'position': $marker.location,'icon': "images/tree.png", 'bounds': true}).click(function()
            {
                $('#map_canvas').gmap('openInfoWindow', {'content': arr[this.id][0]}, this);
            });
        }
    }
    //alert("number of trees ="+i);
 
}
//***********************************************
//Show User Location Attempt
//
//Fix in future update
//
/*
function showUserlocation(){
    var userIcon = 'images/bluedot.png';
    
    //Try and get the user's location
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position)
                                                 {
                                                 var userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                                                 $('#map_canvas').gmap('addMarker', {
                                                                       'position': userLocation,
                                                                       'bounds': false,
                                                                       'icon': userIcon
                                                                       });
                                                 },{maximumAge: 10000,timeout: 10000,enableHighAccuracy:true});
    };

    
}
*/
//
//
//****************************************************


//**********************************************
//DISTANCE FUNCTIONS
//
//
//
//
function haversine(val) //return sin^2 val
{
	return ((1 - Math.cos(val)) / 2);
}

//return the radian measure of the degree measure passed into the function
function to_rad(degrees)
{
	return degrees * (Math.PI/180);
}

//returns the distance between the devices current location and the lat, long pushed into the function
function distance(lat, long)
{
	var r = 3956.6; //Radius of the earth in miles
	var lamda = Math.abs((lat - currentLocation.latitude) * (Math.PI/180)); 
	var theta = Math.abs((long - currentLocation.longitude) * (Math.PI/180));
	var a_inner = Math.abs(haversine(lamda) + Math.cos(to_rad(lat)) * Math.cos(to_rad(currentLocation.latitude)) * haversine(theta));
	var a = Math.sqrt(a_inner);
	var d = 2*r*Math.asin(a);
	return d;
}
//
//
//
//**********************************************


