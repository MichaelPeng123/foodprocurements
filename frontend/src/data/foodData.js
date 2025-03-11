// This file contains the raw CSV data as a string variable

const foodData = `foodcode,description,foodgroups,foodsubgroups
100058,"Fish, Unbreaded",Fish,Fish
100157,"Fish, Nuggets/Patties, Breaded",Fish,Fish
100256,"Fish, Breaded, w/Cheese",Fish,Fish
101056,Catfish FilletJCatfish Nuggets,Fish,Fish
102054,"Pollock Patties/Nuggets, Breaded",Fish,Fish
102153,Pollock Patties/Nuggets with Cheese,Fish,Fish
102252,Pollock Fillet,Fish,Fish
103052,"Salmon, Canned",Fish,Fish
103151,Salmon Patties/Nuggets,Fish,Fish
103259,Salmon Fillet,Fish,Fish
103341,Dried Fish,Fish,Fish
103357,Fish Cakes I Fish Paste,Fish,Fish
104059,"Seafood, Imitation",Fish,Fish
104158,"Seafood Salad, Imitation",Fish,Shellfish
105057,"Shellfish,  Unbreaded",Fish,Shellfish
105156,"Shellfish, Breaded",Fish,Shellfish
105255,Shellfish Salad,Fish,Shellfish
106014,"Tuna, Fresh or Frozen",Fish,Fish
106055,"Tuna, Canned",Fish,Fish
106154,Tuna Salad,Fish,Fish
106254,Tuna Salad Kit,Fish,Fish
110016,"Dry Beans, Bagged, Miscellaneous",Legumes/nuts/seeds,Dry beans/peas
110024,"Dry Beans, Canned, Miscellaneous",Legumes/nuts/seeds,Dry beans/peas
110032,"Dry Beans, Miscellaneous, Frozen",Legumes/nuts/seeds,Dry beans/peas
110115,"Black-eye Peas/Field Peas/Purple, Bagged",Legumes/nuts/seeds,Dry beans/peas
110123,"Black-eye Peas/Field Peas/Purple, Canned",Legumes/nuts/seeds,Dry beans/peas
110131,"Black-eye Peas/Field Peas/Purple,  Frozen",Legumes/nuts/seeds,Dry beans/peas
110214,"Garbanzo Beans/Chick Peas, Bagged",Legumes/nuts/seeds,Dry beans/peas
110222,"Chili Beans,  Canned",Legumes/nuts/seeds,Dry beans/peas
110313,"Kidney Beans, Bagged",Legumes/nuts/seeds,Dry beans/peas
110321,"Garbanzo Beans/Chick Peas,Canned",Legumes/nuts/seeds,Dry beans/peas
110412,"Lima Beans, Bagged",Legumes/nuts/seeds,Dry beans/peas
110429,"Kidney Beans,  Canned",Legumes/nuts/seeds,Dry beans/peas
110511,"Pinto Beans,  Bagged",Legumes/nuts/seeds,Dry beans/peas
110528,"Lima Beans,  Canned",Legumes/nuts/seeds,Dry beans/peas
110536,"Lima Beans,  Frozen",Legumes/nuts/seeds,Dry beans/peas
110627,"Pinto Beans, Canned",Legumes/nuts/seeds,Dry beans/peas
111022,"Refried Beans, Canned",Legumes/nuts/seeds,Dry beans/peas
111047,"Refried Beans,  Dried",Legumes/nuts/seeds,Dry beans/peas
111072,"Refried Beans, Individual",Legumes/nuts/seeds,Dry beans/peas
111352,"Egg Rolls, Vegetarian",Grain products,Mixtures with grain
111451,Vegetarian Hot Dogs,Legumes/nuts/seeds,Soybeans & soy products
111559,Vegetarian Crumbles,Legumes/nuts/seeds,Soybeans & soy products
112029,Pork and Beans. Canned,Legumes/nuts/seeds,Dry beans/peas
112078,"Pork and Beans,  Individual",Legumes/nuts/seeds,Dry beans/peas
112128,"Vegetarian  Beans,  Canned",Legumes/nuts/seeds,Dry beans/peas
113051,Vegetarian Burger,Legumes/nuts/seeds,Soybeans & soy products
113159,Vegetarian Sausage,Legumes/nuts/seeds,Soybeans & soy products
113258,Vegetarian Bacon,Legumes/nuts/seeds,Soybeans & soy products
113357,Vegetarian Chix,Legumes/nuts/seeds,Soybeans & soy products
114058,Hummus,Legumes/nuts/seeds,Dry beans/peas
120015,"Egg, Fresh",Eggs,Eggs
120031,"Egg. Raw, No Shells",Eggs,Eggs
120048,Egg. Dry,Eggs,Eggs
120133,"Egg, Raw, with Milk",Eggs,Mixtures with eggs
120155,Egg.  Hard Cooked,Eggs,Eggs
120254,Egg Whites/Egg Substitute,Eggs,Eggs
121054,"Egg Patties,  Cooked",Eggs,Mixtures with eggs
121153,Egg Patties w/Cheese,Eggs,Mixtures with eggs
121259,Egg Patties with Cheese&Meat,Eggs,Mixtures with eggs
122052,"Egg Entree,  Crust/Cheese/Meat",Eggs,Mixtures with eggs
122151,"Egg Entree,  Crust/Cheese",Eggs,Mixtures with eggs
122358,"Egg Entree, with Crust",Eggs,Mixtures with eggs
123059,Egg Salad,Eggs,Mixtures with eggs
140054,"Beef,  Ground",Red meats,Beef & veal
140153,"Beef,  Ground,   Cooked",Red meats,Beef & veal
140252,"Beef, Patties,  Raw",Red meats,Beef & veal
140351,"Beef,  Patties,  Cooked",Red meats,Beef & veal
140657,Meatballs/Meatloaf/Salisbury Stk.  No See,Red meats,Beef & veal
141052,Wafer Steaks,Red meats,Beef & veal
141127,"Beef, Canned",Red meats,Beef & veal
141259,"Beef,  Cuts,  Raw",Red meats,Beef & veal
141358,"Beef,  Roasts,  Cooked/Deli Meat",Red meats,Beef & veal
141457,Corned Beef/Pastrami,Red meats,Beef & veal
141559,Cubed Steak,Red meats,Beef & veal
141657,Beef Fajita Strips,Red meats,Beef & veal
142141,Beef Jerky/Slim Jims/Dried Beef,Red meats,Beef & veal
143057,"Hot Dogs, Beef",Red meats,Beef & veal
144055,"Com Dogs/Nuggets,   Beef",Red meats,Beef & veal
144154,"Beef,  Breaded,   Patties/Nuggets",Red meats,Beef & veal
144256,"Beef, Nuggets or Patties w Sauce or Glaze",Red meats,Beef & veal
145053,Beef Barbeque/Sloppy Joes,Red meats,Beef & veal
146051,"Lunchmeat/Bologna,  Beef",Red meats,Beef & veal
147058,"Liverwurst,  Beef",Red meats,Beef & veal
148056,Beef Ribettes,Red meats,Beef & veal
149059,"Beef,  Organs",Red meats,Beef & veal
150053,"Chicken,  Whole,  Raw",Poultry,Chicken
150152,"Chicken,  Cut up/Parts,  Raw",Poultry,Chicken
150251,"Chicken,  Rotisserie",Poultry,Chicken
150359,"Chicken,  Parts,  Breaded,   Raw",Poultry,Chicken
150458,Chicken Roll,Poultry,Chicken
150557,"Chicken,  Parts,  Breaded,  Cooked",Poultry,Chicken
151258,"Chicken,  Parts,  Boneless,   Raw",Poultry,Chicken
151357,"Chicken, Pulled or Diced",Poultry,Chicken
151456,"Chicken,  Ground",Poultry,Chicken
151555,"Chicken, Grill Strips/Patties, Dark/White, Mixed",Poultry,Chicken
151654,"Chicken, Grill Strips/Patties, White Meat",Poultry,Chicken
151757,"Chicken, Grill Strips/Patties, Dark/White Mix, U",Poultry,Chicken
151858,"Chicken Grill Strips/Patties,  Dark Meat",Poultry,Chicken
151955,Chicken Sausage,Poultry,Chicken
152058,"Chicken,  Patties,  Breaded,  Mixed Meat",Poultry,Chicken
152157,"Chicken,  Patties,  Breaded,  White Meat",Poultry,Chicken
152256,"Chicken,  Patties,  White/dark Meat,  Unkn",Poultry,Chicken
153056,"Chicken,  Nuggets,  Mixed Meat",Poultry,Chicken
153155,"Chicken,  Nuggets,  White Meat",Poultry,Chicken
153254,"Chicken,   Nuggets,   White/dark Mix,   Unknown",Poultry,Chicken
154021,"Chicken, Canned",Poultry,Chicken
156059,"LunchmeatJBologna,  Chicken",Poultry,Chicken
156158,"Hot Dogs,  Chicken",Poultry,Chicken
156257,"Com Dogs/Nuggets,  Chicken",Poultry,Chicken
156752,Chicken Barbeque,Poultry,Chicken
156851,"Chicken, Organ Meats",Poultry,Chicken
156959,Chicken Salad,Poultry,Recipe mix
157057,"Chicken Breast, Specialty",Poultry,Chicken
158039,Chicken Pieces Cooked in Tomato Sauce,Poultry,Chicken
158058,"Baby Food, Poultry",Poultry,Mixed poultry
158155,Chicken Nuggets/Patties w Sauce or Glaze,Poultry,Chicken
158253,Chicken Salad Kit,Poultry,Recipe mix
160028,Pork. Canned(lnclude Spam),Red meats,Pork
160052,"Pork.  Ground,  Uncooked",Red meats,Pork
160151,"Pork. Sausage, Uncooked",Red meats,Pork
160259,"Pork.  Sausage, Cooked",Red meats,Pork
160358,"Pork. Cuts, Boneless,  Raw",Red meats,Pork
160457,Pork Roll,Red meats,Pork
161059,"Ham, Boneless/Canadian Bacon",Red meats,Pork
161158,Ham Patties,Red meats,Pork
161257,Ham Shanks/Hocks,Red meats,Pork
161356,Ham Salad,Red meats,Pork
162057,Pork Ribettes,Red meats,Pork
162156,Pork Barbeque,Red meats,Pork
163055,"Bacon, Uncooked",Red meats,Pork
163154,"Bacon,  Cooked",Red meats,Pork
164053,"Pork. Shredded/Crumbles/Seasoned, Ckd",Red meats,Pork
165051,"Pork,  Breaded",Red meats,Pork
166058,Sausage in Batter/Blanket,Red meats,Pork
166157,Scrapple,Red meats,Pork
166253,Sausage and Biscuit,Red meats,Pork
167056,"Pork/Ham,  Cuts, Bone-in",Red meats,Pork
168353,"Pork,  Nuggets/Patties w/Glaze or Sauce",Poultry,Turkey
170051,"Turkey, Whole",Poultry,Turkey
170159,"Turkey,  Parts,  Raw,  Bone-in",Poultry,Turkey
170258,"Turkey,  Boneless,  Parts",Poultry,Turkey
170357,Turkey Rolls,Poultry,Turkey
170456,Turkey Breasts,Poultry,Turkey
170555,"Turkey,  Mixed Roasts",Poultry,Turkey
170654,"Turkey,  Pulled/Sliced/Diced/Deli  Meat",Poultry,Turkey
170753,"Turkey,  Ground",Poultry,Turkey
170854,"Turkey, Patties/Nuggets",Poultry,Turkey
170951,Turkey Sausage,Poultry,Turkey
171058,"Lunchmeat, Turkey",Poultry,Turkey
171157,Turkey Ham/Turkey Canadian  Bacon,Poultry,Turkey
172056,"Hot Dogs, Turkey",Poultry,Turkey
173054,"Bacon, Turkey",Poultry,Turkey
174052,"Com Dogs/Nuggets,  Turkey",Poultry,Turkey
175051,Turkey with Gravy,Poultry,Turkey
176057,Turkey BBQ/Sloppy Joes/Taco Filling,Poultry,Turkey
180059,"Lamb, Ground",Red meats,Lamb
181057,"Buffalo, Ground",Red meats,Buffalo
182055,Game Birds,Poultry,Game birds
183053,"Veal Patties,   Breaded",Red meats,Beef & veal
184051,"Mixed Meats, Beef and Veal",Red meats,Beef & veal
185058,"Lamb, Retail Cuts",Red meats,Lamb
190058,Lunchmeat/Bologna. All Meat,Red meats,Mixed meats
190157,"Hot Dogs, All Meat",Red meats,Mixed meats
190256,Smoked Sausage,Red meats,Mixed meats
190355,Smoked Sausage w/Cheese,Red meats,Mixed meats
190454,Hot Dogw/Chili,Red meats,Mixed meats
190553,"Com Dogs/Nuggets, All Meat",Red meats,Mixed meats
190652,Pepperoni,Red meats,Mixed meats
191056,"Mixed Meats, Beef and Chicken, Ground",Red meats,Mixed meats
191155,"Mixed Meats, Beef and Turkey, Ground",Red meats,Mixed meats
191254,"Mixed Meats, Pork and Poultry",Red meats,Mixed meats
191353,"Meat Mixtures,  Miscellaneous",Red meats,Recipe mix
191456,"Mixed Meats, Beef & Chicken, Ckd",Red meats,Mixed meats
191551,"Mixed Meats,  Beef & Turkey,  Ckd",Red meats,Mixed meats
191651,"Mixed Meats,  Pork & Poultry, Ckd",Red meats,Mixed meats
192054,Gyro Strips,Red meats,Mixed meats
194059,"Baby Food,  Meat",Red meats,Mixed meats
195156,Gravy,Soups & gravies,Gravies
200015,"Apples,  Fresh",Fruits/juices,Fruits
200023,"Apples,  Canned",Fruits/juices,Fruits
200031,"Apples,  Frozen",Fruits/juices,Fruits
200048,"Apples, Dry",Fruits/juices,Fruits
200056,Apple Butter,Fruits/juices,Fruits
200073,"Apples, Fresh, Individual",Fruits/juices,Fruits
200122,"Applesauce, Unsweetened",Fruits/juices,Fruits
200171,"Applesauce, Individual, Unsweetened",Fruits/juices,Fruits
200221,"Pie Filling, Apple",Sugar/desserts,Puddings/pie filling
200254,"Apple Juice, Single Strength, Bulk",Fruits/juices,Juices
200279,"Apple Juice, Individual",Fruits/juices,Juices
200353,"Apple juice,  Concentrate",Fruits/juices,Juices
200452,Apple Rings,Fruits/juices,Fruits
200529,"Applesauce, Canned,   Sweetened",Fruits/juices,Fruits
200574,"Applesauce, Individual, Sweetened",Fruits/juices,Fruits
200659,Apple Cider,Fruits/juices,Juices
200758,"Apples,  Caramel",Fruits/juices,Fruits
200857,"Apples,  Baked/Escalloped",Fruits/juices,Fruits
202011,"Apricots,  Fresh",Fruits/juices,Fruits
202028,"Apricots,  Canned, Syrup Pack Unknown",Fruits/juices,Fruits
202033,"Apricots, Frozen",Fruits/juices,Fruits
202044,"Apricots,  Dry",Fruits/juices,Fruits
202127,"Apricots, Canned, Heavy Syrup",Fruits/juices,Fruits
202226,"Apricots, Canned, Light Syrup",Fruits/juices,Fruits
202325,"Apricots, Canned, Juice Pack",Fruits/juices,Fruits
202428,Apricot Nectar,Fruits/juices,Juices
202529,"Apricots, Canned, Water Pack",Fruits/juices,Fruits
203018,"Avocado,  Fresh",Fruits/juices,Fruits
203117,Guacamole,Fruits/juices,Fruits
204016," Bananas, Fresh    ",Fruits/juices,Fruits
204024,"Bananas, Canned                                            ",Fruits/juices,Fruits
204032,"Bananas, Frozen",Fruits/juices,Fruits
204049,"Bananas, Dried/Dehydrated",Fruits/juices,Fruits
204115,"Plantains, Fresh",Fruits/juices,Fruits
204131,"Plantains, Frozen",Fruits/juices,Fruits
205014,"Blackberries,  Fresh",Fruits/juices,Fruits
205022,"Blackberries,  Canned",Fruits/juices,Fruits
205039,"Blackberries, Frozen",Fruits/juices,Fruits
206012,"Blueberries,  Fresh",Fruits/juices,Fruits
206029,"Blueberries,  Canned",Fruits/juices,Fruits
206037,"Blueberries,  Frozen",Fruits/juices,Fruits
206044,"Blueberries, Dry/Dehydrated",Fruits/juices,Fruits
206128,"Pie Filling, Blueberry",Sugar/desserts,Puddings/pie filling
210014,"Cherries, Fresh",Fruits/juices,Fruits
210022,"Cherries, Tart,  Canned",Fruits/juices,Fruits
210039,"Cherries, Red Tart,  Frozen",Fruits/juices,Fruits
210047,"Cherries, Tart, Dry",Fruits/juices,Fruits
210070,"Cherries, Individual Serving",Fruits/juices,Fruits
210121,"Cherries, Sweet, Canned",Fruits/juices,Fruits
210229,"Cherries,  Maraschino, Canned",Fruits/juices,Fruits
210237,"Cherries, Sweet,  Frozen",Fruits/juices,Fruits
210328,"Pie Filling, Cherry",Sugar/desserts,Puddings/pie filling
211012,"Coconut, Fresh",Fruits/juices,Fruits
211022,Coconut Milk,Fruits/juices,Juices
211045,"Coconut,  Dry",Fruits/juices,Fruits
212019,"Cranberries,  Fresh",Fruits/juices,Fruits
212035,"Cranberries,  Frozen",Fruits/juices,Fruits
212043,"Cranberries, Dry",Fruits/juices,Fruits
212159,"Cranberry, Juice, Single Strength Coded",Non dairy drinks,Fruit drinks
212258,"Cranberry Juice, Concentrate",Non dairy drinks,Fruit drinks
212357,Cranberry Sauce,Fruits/juices,Fruits
214048,Dates,Fruits/juices,Fruits
216029,"Figs, Canned",Fruits/juices,Fruits
216044,Figs,Fruits/juices,Fruits
222018,"Grapefruit, Fresh",Fruits/juices,Fruits
222026,"Grapefruit,  Canned",Fruits/juices,Fruits
222158,"Grapefruit Juice, Concentrate",Fruits/juices,Juices
222257,"Grapefruit Juice, Single Strength, Bulk",Fruits/juices,Juices
222273,"Grapefruit Juice, Individual",Fruits/juices,Juices
223011,Guava,Fruits/juices,Fruits
223157,Guava Nectar,Fruits/juices,Juices
224014,"Grapes, Fresh",Fruits/juices,Fruits
224022,"Grapes, Canned/Jubilee Grapes   ",Fruits/juices,Fruits
224077,"Grapes,  Fresh, Individual                                                                ",Fruits/juices,Fruits
224154,"Grape Juice,  Concentrate",Fruits/juices,Juices
224253,"Grape Juice,  Single Strength,  Bulk",Fruits/juices,Juices
224278," Grape juice,  Individual     ",Fruits/juices,Juices
225012,Jicama                                                     ,Fruits/juices,Fruits
226019,Kiwi,Fruits/juices,Fruits
226118,Kumquats,Fruits/juices,Fruits
227017,"Lemons, Fresh",Fruits/juices,Fruits
227157,Lemon Juice,Fruits/juices,Juices
227355,"Lemonade,  Concentrate",Non dairy drinks,Juices
227454,"Lemonade, Single Strength Bulk  ",Non dairy drinks,Juices
227479,"Lemonade,  Individual",Non dairy drinks,Juices
227751,Lemon Extract,Condiments,Flavorings
227859,"Pie Filling, Lemon",Sugar/desserts,Puddings/pie filling
228015,"Limes, Fresh",Fruits/juices,Fruits
228155,"Lime Juice, Single Strength",Fruits/juices,Juices
229013,"Mangoes, Fresh",Fruits/juices,Fruits
229038,"Mango,  Frozen",Fruits/juices,Fruits
229047,"Mangoes, Dried",Fruits/juices,Fruits
230012,"Melons, Watermelons",Fruits/juices,Fruits
230037,"Melons,  Frozen",Fruits/juices,Fruits
230111,"Melons,  Cantaloupes",Fruits/juices,Fruits
230219,"Melons, Honeydew",Fruits/juices,Fruits
230318,"Melons, Other",Fruits/juices,Fruits
231019,"Mineolas,  Fresh",Fruits/juices,Fruits
232017,"Nectarines,  Fresh",Fruits/juices,Fruits
233015,"Oranges,  Fresh",Fruits/juices,Fruits
233023,"Oranges, Peeled/Sectioned",Fruits/juices,Fruits
233056,"Orange Juice, Concentrate",Fruits/juices,Juices
233112,"Oranges,  Mandarin,  Fresh",Fruits/juices,Fruits
233122,"Oranges,  Mandarin,  Canned",Fruits/juices,Fruits
233155,"Orange Juice,  Single Strength,",Fruits/juices,Juices
233171,"Orange Juice, Individual",Fruits/juices,Juices
233177,"Oranges,  Mandarin,  Individual ",Fruits/juices,Fruits
234013,"Peaches, Fresh",Fruits/juices,Fruits
234021,"Peaches,  Canned,  Syrup Pack Unknown",Fruits/juices,Fruits
234038,"Peaches, Frozen",Fruits/juices,Fruits
234046,"Peaches, Dry",Fruits/juices,Fruits
234079,"Peaches, Individual Serving",Fruits/juices,Fruits
234129,"Peaches, Canned, Heavy Syrup",Fruits/juices,Fruits
234228,"Peaches,  Canned,  Light Syrup",Fruits/juices,Fruits
234252,"Pie Filling, Peach",Sugar/desserts,Puddings/pie filling
234327,"Peaches, Canned, Juice Pack",Fruits/juices,Fruits
234459,Peach Nectar,Fruits/juices,Juices
234521,"Peaches,  Canned,  Wamr Pack",Fruits/juices,Fruits
236018,Papayas,Fruits/juices,Fruits
238014,"Pears, Fresh",Fruits/juices,Fruits
238022,"Pears,  Canned,  Syrup Pack Unknown",Fruits/juices,Fruits
238047,"Pears, Dry",Fruits/juices,Fruits
238071,"Pears,  Canned, Individual",Fruits/juices,Fruits
238121,"Pears, Canned, Heavy Syrup",Fruits/juices,Fruits
238229,"Pears, Canned,  Light Syrup",Fruits/juices,Fruits
238328,"Pears, Canned, Juice Pack",Fruits/juices,Fruits
238459,Pear Nectar,Fruits/juices,Juices
238522,"Pears, Canned, Water Pack",Fruits/juices,Fruits
240011,"Pineapple,  Fresh",Fruits/juices,Fruits
240028,"Pineapple,  Canned,  Syrup Pack Unknown",Fruits/juices,Fruits
240037,"Pineapple,  Frozen ",Fruits/juices,Fruits
240044,"Pineapple,  Dry",Fruits/juices,Fruits
240077,"Pineapple, Canned, Individual",Fruits/juices,Fruits
240127,"Pineapple, Canned, Heavy Syrup",Fruits/juices,Fruits
240151,"Pineapple Juice, Concentrate",Fruits/juices,Juices
240226,"Pineapple, Canned, Light Syrup",Fruits/juices,Fruits
240259,"Pineapple Juice,  Single Strength",Fruits/juices,Juices
240275,"Pineapple juice,  Individual",Fruits/juices,Juices
240325,"Pineapple,  Canned, Juice Pack",Fruits/juices,Fruits
240425,"Pineapple, Canned, Water Pack",Fruits/juices,Fruits
241016,"Pluot, Fresh",Fruits/juices,Fruits
242016,"Plums, Fresh",Fruits/juices,Fruits
242024,"Plums,  Canned,  Syrup Pack Unknown",Fruits/juices,Fruits
243014,"Prunes, Fresh",Fruits/juices,Fruits
243022,"Prunes, Canned",Fruits/juices,Fruits
243055,"Prune Juice,  Concentrate",Fruits/juices,Juices
243121,"Plums,  Canned,  Heavy Syrup",Fruits/juices,Fruits
243154,"Prune Juice,  Single Strength,  Bulk",Fruits/juices,Juices
243179,"Prune Juice,  Individual",Fruits/juices,Juices
243229,"Plums, Canned,  Light Syrup",Fruits/juices,Fruits
243253,Prune Puree,Fruits/juices,Fruits
243328,"Plums, Canned, Juice Pack",Fruits/juices,Fruits
243423,"Plums, Canned, Water Pack",Fruits/juices,Fruits
244012,"Pomegranates, Fresh",Fruits/juices,Fruits
245043,"Raisins, Bulk",Fruits/juices,Fruits
245076,"Raisins, Individual Pack",Fruits/juices,Fruits
246017,"Raspberries, Fresh",Fruits/juices,Fruits
246025,"Raspberries,  Canned",Fruits/juices,Fruits
246033,"Raspberries,  Frozen",Fruits/juices,Fruits
247015,"Rhubarb,  Fresh",Fruits/juices,Fruits
247031,"Rhubarb,  Frozen",Fruits/juices,Fruits
250019,Star fruit,Fruits/juices,Fruits
251017,"Strawberries,  Fresh",Fruits/juices,Fruits
251033,"Strawberries,  Frozen",Fruits/juices,Fruits
251075,"Strawberries,  Individual Serv",Fruits/juices,Fruits
251157,"Pie Filling, Strawberry",Sugar/desserts,Puddings/pie filling
252015,"Tangelos,  Fresh",Fruits/juices,Fruits
253013,"Tangerines,  Fresh",Fruits/juices,Fruits
260034,"Fruit juice, Bars,  Frozen",Fruits/juices,Juices
260059,"Fruit Juice, Mixed Fruit, Single Strength, Bulk",Fruits/juices,Juices
260075,"Fruit Juice,  Mixed,  Individual",Fruits/juices,Juices
260158,"FruitJuice,  Mixed Fruit,  Concentrate",Fruits/juices,Juices
260233,Popsicles/FruitIces,Sugar/desserts,Sherbet/ices
260258,"Fruit Drinks, Single Strength",Non dairy drinks,Fruit drinks
260274,"Fruit Drinks, Individual",Non dairy drinks,Fruit drinks
260348,"Fruit Drink Mix, Dry, No Sweet",Non dairy drinks,Dry beverage
260357,"Fruit Drink, Concentrate",Non dairy drinks,Fruit drinks
260447,"Fruit Juice, Other, Individual",Non dairy drinks,Dry beverage
260458,"Fruit Juice, Other",Fruits/juices,Juices
260477,"Fruit Juice,  Other,Individual",Fruits/juices,Juices
260546,"Fruit Drink Mix, Dry, w/Artificial Sweet",Non dairy drinks,Dry beverage
260653,"Jams/Jellies, Bulk",Sugar/desserts,"Jellies, jams & preserves"
260678,"Jams/Jellies, Individual",Sugar/desserts,"Jellies, jams & preserves"
260752,Fruit Rolls/Snacks,Fruits/juices,Fruits
260851,"Pies or Cobblers, Fruit, Whole",Bakery products,Cakes & other bakery desserts
260876,"Pies/Tarts!Turnovers,  Fruit,  Individual",Bakery products,Cakes & other bakery desserts
260959,"Baby Food, Fruit",Fruits/juices,Fruits
261016,"Mixed Fruit, Fresh",Fruits/juices,Fruits
261024,"Mixed Fruit, Canned, Syrup Pack Unknown",Fruits/juices,Fruits
261032,"Mixed Fruit, Frozen",Fruits/juices,Fruits
261041,"Mixed Fruit, Dry/Dehydrated",Fruits/juices,Fruits
261123,"Mixed Fruit, Canned , Heavy Syrup",Fruits/juices,Fruits
261222,"Mixed Fruit, Canned, Light Syrup",Fruits/juices,Fruits
261270,"Mixed Fruit,  Individual",Fruits/juices,Fruits
262229,"Mixed Fruit, Canned, Juice Pack",Fruits/juices,Fruits
262324,"Mixed Fruit, Canned, Water Pack",Fruits/juices,Fruits
263227,"Mixed Fruit, Tropical",Fruits/juices,Fruits
264059,"Salad, Fruit, Specialty, Other",Fruits or Juices,Fruits
265058,"Fruit, Breaded",Fruits/juices,Fruits
266056,Mixed Fruit. Citrus Salad,Fruits/juices,Fruits
267054,"Pie Filling, Mince   ",Sugar/desserts,Puddings/pie filling
268019,"Tropical Fruit, Fresh",Fruits/juices,Fruits
300013,"Asparagus, Fresh",Vegetables,Green vegetables
300021,"Asparagus, Canned",Vegetables,Green vegetables
300038,"Asparagus,  Frozen",Vegetables,Green vegetables
301011,"Artichoke,  Fresh",Vegetables,Green vegetables
301028,"Artichokes,  Canned",Vegetables,Green vegetables
302018,"Bean Sprouts, Fresh",Vegetables,Green vegetables
302026,"Bean Sprouts, Canned",Vegetables,Green vegetables
304014,"Green Beans,  Fresh",Vegetables,Green vegetables
304022,"Green Beans,  Canned",Vegetables,Green vegetables
304039,"Green Beans, Frozen",Vegetables,Green vegetables
304070,"Green Beans, Individual",Vegetables,Green vegetables
304138,Green Bean Casserole,Vegetables,Mixtures with vegetables
308015,"Wax Beans,  Fresh",Vegetables,Yellow vegetables
308023,"Wax Beans,  Canned",Vegetables,Yellow vegetables
308138,"Wax Beans,  Frozen",Vegetables,Yellow vegetables
310012,"Beets, Fresh",Vegetables,Other vegetables
310029,"Beets, Canned  ",Vegetables,Other vegetables
314013,"Broccoli, Fresh",Vegetables,Green vegetables
314038,"Broccoli, Frozen",Vegetables,Green vegetables
314117,Broccoli Florets,Vegetables,Green vegetables
314137,Broccoli w/Cheese,Vegetables,Mixtures with vegetables
316018,"Brussels Sprouts, Fresh",Vegetables,Green vegetables
316034,"Brussels Sprouts, Frozen",Vegetables,Green vegetables
318014,"Cabbage, Head",Vegetables,Green vegetables
318022,Sauerkraut,Vegetables,Other vegetables
318113,"Cabbage, Shredded",Vegetables,Green vegetables
318212,"Cabbage,  Shredded w/Other Veg.",Vegetables,Mixed vegetables
318352,Cole Slaw,Vegetables,Mixtures with Vegetables
320011,"Carrots,  Fresh",Vegetables,Yellow vegetables
320028,"Carrots,  Canned",Vegetables,Yellow vegetables
320036,"Carrots,  Frozen",Vegetables,Yellow vegetables
320077,"Carrots, Individual Serving, Fresh",Vegetables,Yellow vegetables
320085,Carrot Juice,Fruits/juices,Juices
320119,"Carrots Sticks/Baby Carrots/Shrd, Bulk",Vegetables,Yellow vegetables
320178,"Carrots w/dip, individual pack",Vegetables,Yellow vegetables
322016,"Cauliflower, Heads",Vegetables,Other vegetables
322032,"Cauliflower, Frozen",Vegetables,Other vegetables
322115,"Cauliflower, Florets",Vegetables,Other vegetables
324012,"Celery,  Fresh",Vegetables,Green vegetables
324029,"Celery,  Canned",Vegetables,Green vegetables
324038,"Celery, Frozen",Vegetables,Green vegetables
324045,"Celery,  Dry/Dehydrated",Vegetables,Green vegetables
324111,Celery Sticks/Diced Celery,Vegetables,Green vegetables
326017,"Chard, Fresh",Vegetables,Green vegetables
327016,Cilantro,Vegetables,Green vegetables
328013,"Collards, Fresh",Vegetables,Green vegetables
328021,"Collards, Canned",Vegetables,Green vegetables
328038,"Collards, Frozen",Vegetables,Green vegetables
330019,"Com on the Cob,  Fresh",Vegetables,Yellow vegetables
330035,"Com on the Cob,  Frozen",Vegetables,Yellow vegetables
330076,"Com,  Individual Servings",Vegetables,Yellow vegetables
330225,"Com, Whole Kemel, Canned",Vegetables,Yellow vegetables
330233,"Com, Whole Kernel, Frozen",Vegetables,Yellow vegetables
330324,"Com, Creamed,  Canned",Vegetables,Yellow vegetables
330332,"Com, Creamed, Frozen",Vegetables,Yellow vegetables
330423,"Com,  Baby",Vegetables,Yellow vegetables
330555,Com Relish,Vegetables,Mixtures with vegetables
330654,"Mixed Vegetables,  Chuckwagon/Mexican",Vegetables,Mixed vegetables
330737,Com Pudding,Vegetables,Mixtures with vegetables
334011,"Cucumbers,  Fresh",Vegetables,Green vegetables
334028,Pickles,Condiments,Pickles/olives
334127,"Relish, Pickle",Condiments,Pickles/olives
334226,"Relish,  Hot Dog",Condiments,Pickles/olives
336016,"Eggplant, Fresh",Vegetables,Other vegetables
336032,Eggplant Parmesan,Vegetables,Mixtures with vegetables
336156,Babaganoush,Vegetables,Mixtures with vegetables
336338,"Eggplant,  Breaded",Vegetables,Mixtures with vegetables
338012,"Kale,  Fresh",Vegetables,Green vegetables
338029,"Kale,  Canned",Vegetables,Green vegetables
338037,"Kale,  Frozen",Vegetables,Green vegetables
340018,"Lettuce,  Heads",Vegetables,Green vegetables
340117,"Lettuce,  Shredded/Chopped",Vegetables,Green vegetables
340216,"Lettuce,  Salad Mix",Vegetables,Mixed vegetables
342014,"Mushrooms, Fresh",Vegetables,Other vegetables
342022,"Mushrooms,  Canned",Vegetables,Other vegetables
342039,"Mushrooms,  Frozen",Vegetables,Other vegetables
344019,"Mustard Greens, Fresh",Vegetables,Green vegetables
344027,"Mustard Greens,  Canned",Vegetables,Green vegetables
344035,"Mustard Greens,  Frozen",Vegetables,Green vegetables
346015,"Okra,  Fresh",Vegetables,Green vegetables
346023,"Okra,  Canned",Vegetables,Green vegetables
346031,"Okra,  Frozen",Vegetables,Green vegetables
346139,"Okra,  Breaded",Vegetables,Mixtures with vegetables
347021,Olives,Condiments,Pickles/olives
347129,"Oil, Olive",Fats/oils,Vegetable oils & shortenings
348011,"Onions,  Green,  Fresh",Vegetables,Other vegetables
349018,"Onions,  Fresh",Vegetables,Other vegetables
349034,"Onions,  Frozen",Vegetables,Other vegetables
349042,"Onions,  Dried",Vegetables,Other vegetables
349158,Onion Rings,Vegetables,Mixtures with vegetables
363019,"Parsley, Fresh",Vegetables,Green vegetables
364017,"Peas, Green,  Fresh",Vegetables,Green vegetables
364025,"Peas,  Green,  Canned",Vegetables,Green vegetables
364033," Peas, Green,  Frozen    ",Vegetables,Green vegetables
364072,"Peas, Green, Individual",Vegetables,Green vegetables
364157,"Peas, Snow/Pods",Vegetables,Green vegetables
364256,"Mixed Vegetables,  Peas and Carrots",Vegetables,Mixed vegetables
364355,"Mixed Vegetables, Peas and Onions",Vegetables,Mixed vegetables
366013,"Peppers, Fresh",Vegetables,Green vegetables
366021,"Peppers, Bell, Canned",Vegetables,Green vegetables
366038,"Peppers,  Frozen",Vegetables,Green vegetables
366046,"Peppers,  Bell,  Dry",Vegetables,Green vegetables
366129,"Peppers,  Hot or Sweet,  Canned",Condiments,Pickles/olives
366144,"Peppers,  Hot,  Dry",Condiments,Pickles/olives
367028,Pimentos,Vegetables,Other vegetables
369057,"Root Vegetable,  Other",Vegetables,Other vegetables
370015,"Potatoes,  Fresh",Vegetables,Potato Be potato products
370023,"Potatoes,  Canned",Vegetables,Potato Be potato products
370031,"Potatoes, Whole/Sliced/Diced, Frozen",Vegetables,Potato Be potato products
370048,"Potatoes,  Dry",Vegetables,Potato Be potato products
370139,"Potatoes,  Formed,  Frozen",Vegetables,Potato Be potato products
370147,"Potatoes, Dry, w/Milk",Vegetables,Potato Be potato products
370179,"Potatoes, Formed, Individual",Vegetables,Potato Be potato products
370234,"Potatoes,  Fries,  Battered",Vegetables,Potato Be potato products
370246,"Potatoes,  Hash Browns,  Dry",Vegetables,Potato Be potato products
370278,"Potato, Fries, Individual",Vegetables,Potato Be potato products
370353,"Potato, Pierogies",Vegetables,Potato Be potato products
370436,"Potatoes,  Baked, Frozen",Vegetables,Potato Be potato products
370535,"Potatoes,  French Fries",Vegetables,Potato Be potato products
370633,"Potatoes,  Wedges,  Frozen",Vegetables,Potato & potato products
370659,"Chips,  Potato or Potato Sticks",Bakery products,Pretzels & snack chips
370733,Potato Skins,Vegetables,Potato & potato products
370832,"Potatoes w/Sauce,  Prepared",Vegetables,Potato & potato products
370840,"Potatoes w/ Sauce,  Dry",Vegetables,Potato Be potato products
370931,"Potatoes,  Stuffed",Vegetables,Potato Be potato products
370956,"Potatoes, Mashed (Knish)",Vegetables,Potato & potato products
370975,"Potatoes, Mashed, Individual",Vegetables,Potato & potato products
371013,"Pumpkin, Fresh",Vegetables,Yellow vegetables
371021,"Pumpkin, Canned",Vegetables,Yellow vegetables
371129,"Pie Filling, Pumpkin",Sugar/desserts,Puddings/pie filling
371256,Pumpkin Seeds,Legumes/nuts/seeds,Seeds
372011,"Radishes, Fresh",Vegetables,Other vegetables
373018,"Rutabagas, Fresh",Vegetables,Other vegetables
374016,"Spinach, Fresh",Vegetables,Green vegetables
374024,"Spinach, Canned",Vegetables,Green vegetables
374032,"Spinach, Frozen",Vegetables,Green vegetables
374131,"Spinach, Creamed/Spinach Dip",Vegetables,Mixtures with vegetables
374230,"Spinach, Souffle",Vegetables,Mixtures with vegetables
374437,Spinach Filled Pastry,Vegetables,Mixtures with vegetables
375014,Alfalfa Sprouts,Vegetables,Other vegetables
376012,"Squash, Fresh",Vegetables,Other vegetables
376029,"Squash, Canned",Vegetables,Yellow vegetables
376037,"Squash, Frozen",Vegetables,Other vegetables
376136,Squash Casserole,Vegetables,Mixtures with vegetables
377019,"Sweet Potatoes,  Fresh",Vegetables,Yellow vegetables
377027,"Sweet Potatoes,  Canned,  Pk Unk",Vegetables,Yellow vegetables
377035,"Sweet Potatoes,  Frozen",Vegetables,Yellow vegetables
377043,"Sweet Potato,  Dry",Vegetables,Yellow vegetables
377126,"Sweet Potatoes,  Canned,  HS",Vegetables,Yellow vegetables
377159,"Sweet Potato, Mashed",Vegetables,Yellow vegetables
377225,"Sweet Potatoes,  Canned,  Light Syrup",Vegetables,Yellow vegetables
377258,Sweet Potatoes and Apples,Vegetables,Mixtures with vegetables
377357,Sweet Potato Patties,Vegetables,Yellow vegetables
377456,Sweet Potato Fries,Vegetables,Yellow vegetables
377555,"Potatoes, Medley",Vegetables,Potato & potato products
378017,"Tomatoes,  Fresh",Vegetables,Tomatoes & tomato products
378041,"Tomatoes,  Dried",Vegetables,Tomatoes & tomato products
378116,"Tomatoes,  Cherry or Grape, Fresh",Vegetables,Tomatoes & tomato products
378124,"Tomatoes,  Canned",Vegetables,Tomatoes & tomato products
378157,"Tomato Juice, Single Strength, Bulk",Vegetables,Tomatoes & tomato products
378173,"Tomato juice,  Individual",Vegetables,Tomatoes & tomato products
378223,"Tomato Paste,  Canned",Vegetables,Tomatoes & tomato products
378322,"Tomato Sauce,  Canned",Vegetables,Tomatoes & tomato products
378421,"Catsup or Chili Sauce, Bulk",Condiments,Catsup & other sauces
378470,"Catsup,  Individual Pack",Condiments,Catsup & other sauces
378520,"Tomato, Puree",Vegetables,Tomatoes & tomato products
378553,Tomato Recipe Sauce,Vegetables,Tomatoes & tomato products
378652,Tomato Recipe Sauce w/Meat or Mushrooms,Vegetables,Tomatoes & tomato products
378850,"Tomatoes,  V-8 Juice",Vegetables,Tomatoes & tomato products
378958,Salsa,Condiments,Catsup & other sauces
379017,"Tomatillo,   Fresh",Vegetables,Tomatoes & tomato products
380014,"Turnips,   Fresh ",Vegetables,Other vegetables
381012,"Turnip Greens,  Fresh",Vegetables,Green vegetables
381029,"Turnip Greens, Canned",Vegetables,Green vegetables
381037,"Turnip Greens, Frozen",Vegetables,Green vegetables
382027,Water Chestnuts,Vegetables,Other vegetables
382118,Watercress,Vegetables,Green vegetables
383132,"Mixed Vegetables,Winter Blend",Vegetables,Mixed vegetables
383231,"Mixed Vegetables,Stew or Soup",Vegetables,Mixed vegetables
383330,"Mixed Vegetables,California/Normandy",Vegetables,Mixed vegetables
383438,"Mixed Vegetables, Italian Blend",Vegetables,Mixed vegetables
383537,"Mixed Vegetables,  Scandinavian Blend",Vegetables,Mixed vegetables
383636,"Mixed Vegetables,Succotash",Vegetables,Mixed vegetables
383735,Mixed Vegetables/w Pasta Blend  ,Vegetables,Mixtures with vegetables
383834,"Mixed Vegetables,Oriental",Vegetables,Mixed vegetables
390013,"Mixed Vegetables,Fresh",Vegetables,Mixed vegetables
390021,"Mixed Vegetables,Canned",Vegetables,Mixed vegetables
390038,"Mixed Vegetables,Frozen",Vegetables,Mixed vegetables
390046,"Mixed Vegetables,Riviera Blend",Vegetables,Mixed vegetables
390054,"Mixed Vegetables,Sicilian Blend",Vegetables,Mixed vegetables
390060,"Mixed Vegetables,Key West Blend",Vegetables,Mixed vegetables
390077,"Mixed Vegetables,Individual",Vegetables,Mixed vegetables
390083,"Mixed Vegetables,Caribbean  Blend",Vegetables,Mixed vegetables
390112,Tropical Vegetables,Vegetables,Mixed Vegetables
390153,"Potato Salad,  Ready to Eat",Vegetables,Potato & potato products
390252,"Bean Salad, Ready to Eat",Vegetables,Mixtures with vegetables
390351,"Mixed Vegetables,  Grilled",Vegetables,Mixed vegetables
390434,"Baby Food,  Vegetable",Vegetables,Other vegetables
390533,"Vegetables, Breaded",Vegetables,Mixtures with vegetables
390616,"Vegetable Salad,  Specialty",Vegetables,Mixtures with vegetables
391052,"Juice Mixed, Veg&Fruit,",Fruits/juices,Juices
391077,"Juice Mixed, Veg&Fruit, Individual                                                ",Fruits/juices,Juices
392042,Nori/Dried Seaweed,Vegetables,Other vegetables
410051,Com Meal,Grain products,Flour & other milled grains
410126,"Com Hominy, Canned",Grain products,"Rice,  barley & other grains"
410258,Com Grits,Grain products,Flour & other milled grains
410357,Com Syrup,Sugar/desserts,Syrups
410456,Com Starch,Grain products,Flour & other milled grains
410555,"Oil,  Com",Fats/oils,Vegetable oils & shortenings
410654,"Chips,  Tortilla/Corn",Bakery products,Pretzels & snack chips
410753,Taco Shells or Taco Bowls    ,Bakery products,Bread & rolls
420050,Rolled Oats,Grain products,Breakfast cereals
430058,"Rice,  Brown",Grain products,"Rice,  barley & other grains"
430157,"Rice, White",Grain products,"Rice, barley & other grains"
430256,"Rice, Wild Mix",Grain products,Mixtures with grain
430355,"Rice Recipe Mix (Pilaf,  Spanish)",Grain products,Mixtures with grain
430454,Rice Cakes,Bakery products,Pretzels & snack chips
430553,Rice and Beans,Grain products,Mixtures with grain
430651,"Rice,  Fried",Grain products,Mixtures with grain
430751,Rice Milk,Grain products,"Rice,  barley & other grains"
440057,Vegetable protein product,Legumes/nuts/seeds,Soybeans & soy products
440156,Cheese Substitute,Legumes/nuts/seeds,Soybeans & soy products
440255,"Oil, Soybean",Fats/oils,Vegetable oils & shortenings
440354,"Shortening, Soybean",Fats/oils,Vegetable oils & shortenings
440552,"Bacon Bits, Imitation",Legumes/nuts/seeds,Soybeans & soy products
440651,Tofu,Legumes/nuts/seeds,Soybeans & soy products
440759,Soy Sauce,Condiments,Flavorings
440852,Milk. Soy,Legumes/nuts/seeds,Soybeans & soy products
440955,Soybeans,Legumes/nuts/seeds,Soybeans & soy products
450056,"Flour, All Purpose",Grain products,Flour & other milled grains
450155,"Flour, Whole Wheat",Grain products,Flour & other milled grains
450254,"Flour, Buckwheat",Grain products,Flour & other milled grains
450452,"Flour, Bread",Grain products,Flour & other milled grains
450551,"Flour, Self-Rising",Grain products,Flour & other milled grains
450659,Stuffing Mix,Grain products,Mixtures with grain
450758,Crumbs/Breadi ng Mix,Grain products,Mixtures with grain
450857,"Cereal, Cream of Wheat/Farina",Grain products,Breakfast cereals
452052,"Pasta, Dry",Grain products,Pasta & noodles
452151,"Pasta, Refrigerated or Frozen",Grain products,Pasta & noodles
452259,"Pasta,  Chinese Noodles",Grain products,Pasta & noodles
453059,Bulgur,Grain products,"Rice,  barley & other grains"
453158,Couscous,Grain products,"Rice,  barley & other grains"
453257,Bran,Grain products,Flour & other milled grains
453356,Wheat Germ,Grain products,Flour & other milled grains
454453,Vinegar,Condiments,Flavorings
455055,"Tortillas,   Flour",Bakery products,Bread & rolls
455154,Croutons and Bread Sticks,Bakery products,Crackers
455253,Bread/Biscuit/Pastry  Dough,Bakery products,Bread & rolls
455352,Bread/Biscuit Mixes,Grain products,Flour mix
455451,Cake/Brownie  Mixes,Grain products,Flour mix
455559,Cookie Dough,Bakery products,Cakes & other bakery desserts
455658,Cookie Mix,Grain products,Flour mix
455757,Ice Cream Cones,Bakery products,Cakes & other bakery desserts
455851,Muffin Batter,Bakery products,Bread & rolls
455852,Cinnamon Rolls/Honey Bun,Bakery products,"Biscuits, muffins, pancakes & waffles"
455956,Muffin Mix,Grain products,Flour mix
456053,"Bread, White",Bakery products,Bread & rolls
456152,"Bread, French/Sourdough",Bakery products,Bread & rolls
456251,"Bread, Whole Wheat/Whole Grain",Bakery products,Bread & rolls
456257,"Bread, Wheat",Bakery products,Bread & rolls
456359,"Bread,  Raisin",Bakery products,Bread & rolls
456458,"Bread, P-rta",Bakery products,Bread & rolls
456557,"Bread,  Sweetened",Bakery products,Bread & rolls
456656,"Bread, Type Unspecified",Bakery products,Bread & rolls
456755,Bread w/Cheese,Bakery products,Bread & rolls
456854,Garlic Bread,Bakery products,Bread & rolls
456953,"Bread, Other",Bakery products,Bread & rolls
457051,Bagels,Bakery products,Bread & rolls
457159,Bagels with Filling,Bakery products,Bread & rolls
457258,Biscuits,Bakery products,"Biscuits, muffins, pancakes & waffles"
457357,"Hamburger, Hot Dog Buns, Steak. Sub & Dinner Rolls",Bakery products,Bread & rolls
457456,English Muffins,Bakery products,"Biscuits, muffins, pancakes & waffles"
457555,Muffins,Bakery products,"Biscuits, muffins, pancakes & waffles"
457654,Danish,Bakery products,"Biscuits, muffins, pancakes & waffles"
457753,Donuts/Churros,Bakery products,"Biscuits,  muffins,  pancakes & waffles"
457852,Croissants ,Bakery products,"Biscuits, muffins, pancakes & waffles"
457951,"Croissants,  Filled",Bakery products,"Biscuits, muffins, pancakes & waffles"
458058,Cookies Bulk,Bakery products,Cakes & other bakery desserts
458074,"Cookies, Individual",Bakery products,Cakes & other bakery desserts
458157,"Crackers,  Bulk",Bakery products,Crackers
458173,"Crackers, Individual",Bakery products,Crackers
458256,"Cakes/Brownies,  Prepared",Bakery products,Cakes & other bakery desserts
458272,"Cakes/Brownies, Prepared, Individual",Bakery products,Cakes & other bakery desserts
458355,Granola Bars/Trail Mix,Bakery products,Cakes & other bakery desserts
458454,Pancakes,Bakery products,"Biscuits, muffins, pancakes & waffles"
458553,Waffles,Bakery products,"Biscuits, muffins, pancakes & waffles"
458652,French Toast/Sticks/French Toast Bagels,Bakery products,"Biscuits, muffins, pancakes & waffles"
458751,Hushpuppies,Bakery products,"Biscuits, muffins, pancakes & waffles"
458855,"Chips, Misc. Snack(Cheetos, Sun Chips)",Bakery products,Pretzels & snack chips
458950,"Pretzels,  Soft",Bakery products,Pretzels & snack chips
458958,Pretzels,Bakery products,Pretzels & snack chips
459056,"Shells, PiefTartJEdibowls",Bakery products,Cakes & other bakery desserts
459155,Pizza Shells/Pizza Dough,Bakery products,Bread & rolls
459254,Poptarts,Bakery products,Cakes & other bakery desserts
459353,"Pies, Non Fruit",Bakery products,Cakes & other bakery desserts
459452," Cereals, Bulk ",Grain products,Breakfast cereals
459477,"Cereals,  Individual",Grain products,Breakfast cereals
459551,"Cereals, Assorted,  Bulk",Grain products,Breakfast cereals
459576,"Cereals, Assorted, Individual",Grain products,Breakfast cereals
459650,Crumb Shell!Topping Mix,Sugar/desserts,Candies/toppings
459675,Crackers and Cheese,Bakery products,Crackers
459774,Crackers and Peanut Butter,Bakery products,Crackers
459857,"Crackers, Graham, Bulk",Bakery products,Crackers
459873,"Crackers, Graham, Individual",Bakery products,Crackers
459956,"Cereals, Baby",Grain products,Breakfast cereals
460055,Peanuts in the Shell,Legumes/nuts/seeds,Peanuts/peanut butter
460154,"Peanuts, Shelled",Legumes/nuts/seeds,Peanuts/peanut butter
460352,Peanut Butter,Legumes/nuts/seeds,Peanuts/peanut butter
460377,"Peanut Butter, Individual Pack",Legumes/nuts/seeds,Peanuts/peanut butter
460658,Peanut Granules,Legumes/nuts/seeds,Peanuts/peanut butter
460757,"Oil, Peanut",Fats/oils,Vegetable oils & shortenings
460856,"Shortening, Peanut",Fats/oils,Vegetable oils & shortenings
460955,Peanut Butter and Jelly,Legumes/nuts/seeds,Peanuts/peanut butter
470054,"Popcorn,  Unpopped",Grain products,"Rice, barley & other grains"
470153,"Popcorn,  Popped",Grain products,"Rice,  barley & other grains"
470252,"Flour, Rye",Grain products,Flour & other milled grains
470351,"Bread,  Pumpernickel/Rye",Bakery products,Bread & rolls
470459,Barley,Grain products,"Rice, barley & other grains"
471052,"Oil,  Cottonseed",Fats/oils,Vegetable oils & shortenings
471151,"Oil, Canela",Fats/oils,Vegetable oils & shortenings
471259,"Oil, Sunflower",Fats/oils,Vegetable oils & shortenings
471358,"Oil, Vegetable",Fats/oils,Vegetable oils & shortenings
471457,"Shortening, Vegetable",Fats/oils,Vegetable oils & shortenings
471556,"Oil, Spray",Fats/oils,Vegetable oils & shortenings
471655,"Oil, Sesame",Fats/oils,Vegetable oils & shortenings
471754,Lard,Fats/oils,Lard & other animal fats
472059,"Mayonnaise, Bulk",Fats/oils,Salad dressings & mayonnaise
472075,"Mayonnaise, Individual",Fats/oils,Salad dressings & mayonnaise
472158,"Mayonnaise, Bulk, Lite",Fats/oils,Salad dressings & mayonnaise
472174,"Mayonnaise,  Individual, Lite",Fats/oils,Salad dressings & mayonnaise
472257,"Salad Dressing,  Bulk",Fats/oils,Salad dressings & mayonnaise
472273,"Salad Dressing, Individual",Fats/oils,Salad dressings & mayonnaise
472356,"Salad Dressing. Bulk, Lo Fat or Lite",Fats/oils,Salad dressings & mayonnaise
472372,"Salad Dressing, Individual, Low Fat or Lite",Fats/oils,Salad dressings & mayonnaise
472455,Salad Dressing Mix,Condiments,Flavorings
472550,"Mayonnaise,  Bulk, Fat Free",Fats/oils,Salad dressings & mayonnaise
472751,"Salad Dressing,  Bulk,  Fat Free",Fats/oils,Salad dressings & mayonnaise
472766,"Mayonnaise, Individual, Fat Free",Fats/oils,Salad dressings & mayonnaise
472879,"Salad Dressing, Individual, Fat Free",Fats/oils,Salad dressings & mayonnaise
473057,Margarine,Fats/oils,Margarine
473073,"Margarine, Individual",Fats/oils,Margarine
473156,Margarine/Butter  Blend,Fats/oils,Margarine
473179,"Margarine/Butter  Blend,   Individual",Fats/oils,Margarine
474055,Tartar Sauce,Condiments,Catsup & other sauces
475053,Pasta Salad,Grain products,Mixtures with grain
476051,Nuts (Not Peanuts) in Shell,Legumes/nuts/seeds,Other nuts
476159,"Nuts (Not Peanuts), Shelled",Legumes/nuts/seeds,Other nuts
477256,Almond Paste,Legumes/nuts/seeds,Other nuts
478353,Sunflower Seeds,Legumes/nuts/seeds,Seeds
478455,Sesame Seeds,Legumes/nuts/seeds,Seeds
478555,"Butter, Legume/nut/seed",Legumes/nuts/seeds,Seeds
479054,"Flours/Starches,  Miscellaneous",Grain products,Flour & other milled grains
500059,"Milk, Whole",Milk & other dairy products,Milk
500158,"Milk, Lo Fat, .5%",Milk & other dairy products,Milk
500257,"Milk, Lo Fat, I%",Milk & other dairy products,Milk
500356,"Milk, Lo Fat,  1.5%",Milk & other dairy products,Milk
500455,"Milk, Lo Fat, 2%",Milk & other dairy products,Milk
500554,"Milk, Lo Fat, Fat Solids Unknown",Milk & other dairy products,Milk
500653,"Milk, Skim/Nonfat",Milk & other dairy products,Milk
500752,"Milk, Flavored, Whole",Milk & other dairy products,Milk
500851,"Milk, Flavored,  Lo Fat, .5%",Milk & other dairy products,Milk
500959,"Milk, Flavored,  Lo Fat,  I%",Milk & other dairy products,Milk
501057,"Milk, Flavored, Lo Fat, 1.5%",Milk & other dairy products,Milk
501156,"Milk, Flavored,  Lo Fat, 2%",Milk & other dairy products,Milk
501255,"Milk, Flavored,  Lo Fat, Fat Solids Unknown",Milk & other dairy products,Milk
501354,"Milk,  Flavored,  Skim/Nonfat",Milk & other dairy products,Milk
501453,"Milk,  Lactose Free",Milk & other dairy products,Milk
501552,"Milk, Acidopholous",Milk & other dairy products,Milk
501651,"Milk, Eggnog",Milk & other dairy products,Milk
501759,"Milk,  Buttermilk",Milk & other dairy products,Milk
501858,"Milk, Evaporated",Milk & other dairy products,Milk
501957,"Milk, Condensed Sweetened",Milk & other dairy products,Milk
502055,"Milk, Dry,  Non Fat",Milk & other dairy products,Milk
502154,"Milk, Buttermilk,  Dry",Milk & other dairy products,Milk
502253,"Cream, Whipping",Milk & other dairy products,Cream
502352,"Cream, Table",Milk & other dairy products,Cream
502451,"Cream,  Half and Half",Milk & other dairy products,Cream
502559,"Cream, Whipped",Milk & other dairy products,Cream
502658,"Milk, Dry, Whole",Milk & other dairy products,Milk
503053,Ice Cream,Milk & other dairy products,Ice cream & ice milk
503152,Ice Cream Novelties,Milk & other dairy products,Ice cream & ice milk
503251,Ice Cream Shakes,Milk & other dairy products,Ice cream & ice milk
503359,Sherbet/Push Ups,Sugar/desserts,Sherbet/ices
503458,Sorbet,Sugar/desserts,Sherbet/ices
503532,"Yogurt,  Frozen",Milk & other dairy products,Yogurt
503557,Yogurt,Milk & other dairy products,Yogurt
504051,Sour Cream,Milk & other dairy products,Cream
504159,"Sour Cream, Lo Fat or Lite",Milk & other dairy products,Cream
504258,"Sour Cream, Imitation",Legumes/nuts/seeds,Soybeans & soy products
504351,"Sour Cream, Fat Free",Milk & other dairy products,Cream
505058,Pudding Mix/ Cheesecake Mix,Sugar/desserts,Puddings/pie filling
505157,"Pudding, Ready to Eat",Sugar/desserts,Puddings/pie filling
505231,"Pudding, Frozen",Sugar/desserts,Puddings/pie filling
505955,"Cheese,  Provolone",Milk & other dairy products,Cheese
506056,"Cheese, American/Processed",Milk & other dairy products,Cheese
506155,"Cheese,  Cheddar",Milk & other dairy products,Cheese
506254,"Cheese, Cottage/Ricotta",Milk & other dairy products,Cheese
506353,"Cheese,  Cream",Milk & other dairy products,Cheese
506452,"Cheese, Feta",Milk & other dairy products,Cheese
506551,"Cheese,  Monterey Jack",Milk & other dairy products,Cheese
506659,"Cheese, Mozzarella/String",Milk & other dairy products,Cheese
506758,"Cheese,  Pannesan/Romano",Milk & other dairy products,Cheese
506857,"Cheese, Swiss",Milk & other dairy products,Cheese
506956,"Cheese, Miscellaneous",Milk & other dairy products,Cheese
507054,Butter,Fats/oils,Butter
507153,Butter Oil,Fats/oils,Butter
508052,Cheese/Substitute Cheese Blend,Milk & other dairy products,Cheese
508151,"Cheese, Lo Fat",Milk & other dairy products,Cheese
508259,Cheese Food,Milk & other dairy products,Cheese
508358,"Cheese Sauce or Soup, Ready to Use",Milk & other dairy products,Cheese
508457,"Cheese Sauce, Mix",Milk & other dairy products,Cheese
508556,"Cheese,  Breaded",Milk & other dairy products,Cheese
509059,"Baby Fonnula, Milk Based",Milk & other dairy products,Milk
509158,"Baby Fonnula, Soy Based",Legumes/nuts/seeds,Soybeans & soy products
513033,Ice Milk,Milk & other dairy products,Ice cream & ice milk
513153,Ice Milk Novelties,Milk & other dairy products,Ice cream & ice milk
513257,Yogurt Shakes,Milk & other dairy products,Yogurt
514259,Shake Mix or Ice Cream Mix,Milk & other dairy products,Ice cream & ice milk
600057,"Sugar, Granulated",Sugar/desserts,Sugars
600156,"Sugar, Confectioner",Sugar/desserts,Sugars
600255,"Sugar, Brown",Sugar/desserts,Sugars
600453,"Syrup, Real Maple",Sugar/desserts,Syrups
600552,"Syrup, Imitation Flavored",Sugar/desserts,Syrups
600651,"Frosting, Ready to Spread",Sugar/desserts,Candies/toppings
600759,Frosting Mix or RTW Frosting,Sugar/desserts,Candies/toppings
600858,Marshmallows,Sugar/desserts,Candies/toppings
600957,Molasses,Sugar/desserts,Syrups
601055,Marshmallow  Fluff,Sugar/desserts,Candies/toppings
601113,"Sugar Cane,  Fresh",Sugar/desserts,Sugars
601154,"Honey,  Bulk",Sugar/desserts,Syrups
601179,"Honey, Individual",Sugar/desserts,Syrups
601253,Cake Mix with Frosting,Bakery products,Cakes & other bakery desserts
601352,"Sodas,  Carbonated",Non dairy drinks,Carbonated
601451,"Sodas, Syrup",Non dairy drinks,Carbonated
601552,Gelatin with Fruit,Sugar/desserts,Gelatins
601658,Whipped Topping,Milk & other dairy products,Milk
601757,"Gelatin,  Dry",Sugar/desserts,Gelatins
601856,"Gelatin,  Prepared",Sugar/desserts,Gelatins
601955,Candy,Sugar/desserts,Candies/toppings
602053,Baking Chips,Sugar/desserts,Candies/toppings
602152,"Toppings, Ice Cream (Not Syrups)",Sugar/desserts,Candies/toppings
602251,"Tea,  Prepared",Non dairy drinks,Coffee & tea
602350,"Tea,   Concentrate",Non dairy drinks,Coffee & tea
602458,"Flavored  Dairy Drink (Yoo-Hoo,Ensure)",Milk & other dairy products,Milk
602551,"Toppings, Ice Cream (Syrups)",Sugar/desserts,Candies/toppings
602658,Tea Bags/Instant,Non dairy drinks,Coffee & tea
602753,Non Dairy Creamer,Non dairy drinks,Coffee & tea
602854,Coffee Beans/Ground/Instant,Non dairy drinks,Coffee & tea
602955,"Coffee,  Prepared",Non dairy drinks,Coffee & tea
603051,"Sweetener, Artificial",Sugar/desserts,Sugars
603157,Coffee Concentrate,Non dairy drinks,Coffee & tea
603233,Cocoa,Condiments,Flavorings
603357,"Chocolate, Baking",Condiments,Flavorings
604157,Cocoa Mix w/Artfficial Sweet & NFDM  ,Sugar/desserts,Sugars
604256,Cocoa Mix w/Sugar and NFDM,Sugar/desserts,Sugars
700055,"Soup,  Condensed,  Tomato",Soups & gravies,Soups
700154,"Soup,  Condensed,  Chicken",Soups & gravies,Soups
700253,"Soup, Condensed,  Vegetable",Soups & gravies,Soups
700352,"Soup, Condensed,  Dry Bean",Soups & gravies,Soups
700451,"Soup,  Condensed,  Cr. of Mushroom",Soups & gravies,Soups
700559,"Soup, Condensed, Miscellaneous",Soups & gravies,Soups
700757,"Soup, Ready to Eat",Soups & gravies,Soups
701054,"Soup, Dry Mix",Soups & gravies,Soups
701152,"Soup, Dry Noodle Mix",Soups & gravies,Soups
702051,"Soup, Chili",Soups & gravies,Soups
703059,Broth/Stock,Soups & gravies,Soups
800053,"Sauce, Barbeque",Condiments,Catsup & other sauces
800152,"Mustard, Bulk",Condiments,Catsup & other sauces
800177,"Mustard, Individual",Condiments,Catsup & other sauces
800250,"Sauce, Pesto",Condiments,Catsup & other sauces
800359,"Sauce, Steak",Condiments,Catsup & other sauces
800458,"Sauce, Hot (Taco, Enchilada)",Condiments,Catsup & other sauces
800557,"Sauce, Sweet and Sour",Condiments,Catsup & other sauces
800656,"Sauce, Horseradish/Cocktail",Condiments,Catsup & other sauces
800755,"Sauce, Honey Mustard",Condiments,Catsup & other sauces
800854,"Sauce, Worcestershire",Condiments,Catsup & other sauces
800953,"Sauce, White",Soups & gravies,Gravies
801051,Salt and Seasoned Salt,Condiments,Flavorings
801076,"Salt, Individual",Condiments,Flavorings
801159,"Mix, Spaghetti, Taco, Sloppy Joe, Chili",Condiments,Flavorings
801258,Gravy Mix,Soups & gravies,Gravies
801357,"Base/Bullion,  Poultry",Soups & gravies,Soups
801456,"Base/Bullion, Meat",Soups & gravies,Soups
801555,"Base/Bullion, Vegetable",Soups & gravies,Soups
801654,"Base, Cream Sauce",Soups & gravies,Gravies
801752,"Juice, Clam or Clam Base",Soups & gravies,Soups
900056,Poultry Filled Pastry/Hot Pockets,Prepared foods,Meat or cheese filled pastry
900159,"Rice, Tomato, and Meat Product",Red meats,Recipe mix
900233,Vegetable Filled Pastry/Hot Pockets,Vegetables,Mixtures with vegetables
900241,"Pasta and Sauce, Dry",Grain products,Mixtures with grain
900258,"Pasta, Cheese, and Tomato Prod",Grain products,Mixtures with grain
900349,"Pasta and Cheese, Dry",Grain products,Mixtures with grain
900357,Pasta and Cheese Products,Grain products,Mixtures with grain
900456,"Pasta, Meat. Tomato, & Cheese",Red meats,Recipe mix
900555,Meat in Cream Sauce,Red meats,Recipe mix
900654,Meat Filled Pastry/Hot Pockets,Prepared foods,Meat or cheese filled pastry
900753,Poultry and Cream Sauce,Poultry,Recipe mix
900852,Cheese Filled Pastry(lncludes Hot Pocket),Prepared foods,Meat or cheese filled pastry
900951,Tuna Casserole,Fish,Fish
901058,"Casserole,  Poultry",Poultry,Recipe mix
901157,Stuffed Peppers or Cabbage,Red meats,Recipe mix
901256,Beef Stew,Red meats,Recipe mix
901355,"Pot Pie, Poultry",Poultry,Recipe mix
901454,"Pot Pie, Beef",Red meats,Recipe mix
901455,"Pasta, Meat, and Tomato",Grain products,Mixtures with grain
901553,Pepper Steak,Red meats,Beef & veal
901652,Beef Stroganoff/Swedish Meatballs,Red meats,Beef & veal
901751,Vegetable Lasagna,Grain products,Mixtures with grain
902056,Egg Rolls,Grain products,Mixtures with grain
902155,Pasta and Tomato Sauce,Grain products,Mixtures with grain
902254,Oriental Entree,Prepared foods,Prepared meals
902353,Hash,Red meats,Beef & veal
902452,Dumplings in Gravy,Grain products,Mixtures with grain
902551,Seafood Casserole,Fish,Fish
902618,Sushi,Prepared foods,Mixtures with fish
903054,"Pizza, w/Real Cheese",Prepared foods,Pizza
903153,"Pizza, Cheese Blend",Prepared foods,Pizza
903252,"Pizza, Sausage w/Real Cheese",Prepared foods,Pizza
903351,"Pizza, Sausage w/Cheese Blend",Prepared foods,Pizza
903459,"Pizza,  Cheese, Type Unknown",Prepared foods,Pizza
903558,"Pizza, Sausage, Cheese Unknown",Prepared foods,Pizza
904151,"Pizza, Pepperoni w/Real Cheese",Prepared foods,Pizza
904259,"Pizza, Pepperoni w/Cheese Blend",Prepared foods,Pizza
904358,"Pizza, Dessert",Prepared foods,Pizza
904457,"Pizza, Misc.(Veg, Sup, Fiest) w Real Chse",Prepared foods,Pizza
904556,"Pizza, Misc.(Veg, Sup, Fiest)w Chse Blend",Prepared foods,Pizza
904655,"Pizza, Pepperoni, Cheese Unknown",Prepared foods,Pizza
904754,"Pizza, Misc.(Veg, Sup, Fiest)w Chse Unkn",Prepared foods,Pizza
905059,"Burrito, Bean",Prepared foods,Burritos/tacos
905158,"Burrito, Beef and Bean",Prepared foods,Burritos/tacos
905257,"Burrito, Beef",Prepared foods,Burritos/tacos
905356,"Burrito,  Poultry",Prepared foods,Burritos/tacos
905455,"Burrito, Poultry and Bean",Prepared foods,Burritos/tacos
905554,"Burrito, Poultry and Beef",Prepared foods,Burritos/tacos
905653,"Burrito, Miscellaneous",Prepared foods,Burritos/tacos
905757,Breakfast Burrito or Eggroll,Grain products,Mixtures with grain
906057,"Enchilada, Cheese",Prepared foods,Burritos/tacos
906156,"Enchilada, Beef",Prepared foods,Burritos/tacos
906255,"Enchilada or Crispito, Chicken",Prepared foods,Burritos/tacos
906354,"Enchilada, Miscellaneous",Prepared foods,Burritos/tacos
906453,Quesadilla.. Cheese,Grain products,Mixtures with grain
906552,Taco or Chalupa. Beef,Prepared foods,Burritos/tacos
906651,Taco or Chalupa.  Chicken,Prepared foods,Burritos/tacos
906759,Gyro or Fajita Kits,Grain products,Mixtures with grain
906858,Canapes,Grain products,Mixtures with grain
906958,Quesadilla.. Meat,Grain products,Mixtures with grain
910059,Assorted Sandwiches,Prepared foods,Prepared sandwiches
910158,Bacon Cheeseburger Sandwich,Prepared foods,Prepared sandwiches
910257,"Bacon, Cheese Chicken Sandwich",Prepared foods,Prepared sandwiches
910356,BBQ Sandwich,Prepared foods,Prepared sandwiches
910455,Bologna Sandwich,Prepared foods,Prepared sandwiches
910554,Bologna and Cheese Sandwich,Prepared foods,Prepared sandwiches
910653,"Bacon, Lettuce, Tomato Sandwich",Prepared foods,Prepared sandwiches
910752,Cheeseburger Sandwich,Prepared foods,Prepared sandwiches
910851,Chicken Sandwich,Prepared foods,Prepared sandwiches
910959,Chili Dog Sandwich,Prepared foods,Prepared sandwiches
911057,Club Sandwich,Prepared foods,Prepared sandwiches
911156,Cold Cut Sandwich,Prepared foods,Prepared sandwiches
911255,Double Cheeseburger Sandwich,Prepared foods,Prepared sandwiches
911354,Cheese Sandwich,Prepared foods,Prepared sandwiches
911453,Gyro Sandwich,Prepared foods,Prepared sandwiches
911552,Ham Sandwich,Prepared foods,Prepared sandwiches
911651,Ham and Cheese Sandwich,Prepared foods,Prepared sandwiches
911759,Hamburger Sandwich,Prepared foods,Prepared sandwiches
911858,Hot Dog with Cheese Sandwich,Prepared foods,Prepared sandwiches
911957,Hotdog Sandwich,Prepared foods,Prepared sandwiches
912055,Pastrami Sandwich,Prepared foods,Prepared sandwiches
912154,Peanut Butter and Jelly Sandwich,Prepared foods,Prepared sandwiches
912253,Porlc chop Sandwich,Prepared foods,Prepared sandwiches
912352,Roast Beef Sandwich,Prepared foods,Prepared sandwiches
912451,Roast Beef and Cheese Sandwich,Prepared foods,Prepared sandwiches
912559,Salami Sandwich,Prepared foods,Prepared sandwiches
912658,Salami and Cheese Sandwich,Prepared foods,Prepared sandwiches
912757,Steak Sandwich,Prepared foods,Prepared sandwiches
912856,Tuna Sandwich,Prepared foods,Prepared sandwiches
912955,Turlcey Sandwich,Prepared foods,Prepared sandwiches
913053,Turlcey and Cheese Sandwich,Prepared foods,Prepared sandwiches
913152,Turkey and Turkey Ham Sandwich,Prepared foods,Prepared sandwiches
913250,Turlcey Bologna and Cheese Sand,Prepared foods,Prepared sandwiches
913359,Turlcey Ham Sandwich,Prepared foods,Prepared sandwiches
913458,Turkey Ham and Cheese Sandwich,Prepared foods,Prepared sandwiches
913557,Turkey Salami and Cheese Sandwich,Prepared foods,Prepared sandwiches
913656,"Prepared Sandwich, Type Unknown",Prepared foods,Prepared sandwiches
913755,Vegetable Sandwich,Prepared foods,Prepared sandwiches
920058,"Apple Sauce, Cranapple Juice, Mustard",Prepared foods,Prepared meals
920157,"Apple Sauce, Fruit Punch, Mustard",Prepared foods,Prepared meals
920256,"Apple Sauce, Grape Juice, Mustard",Prepared foods,Prepared meals
920353,"Apple Sauce, Orange juice, Mustard",Prepared foods,Prepared meals
920454,"Apple Sauce, PineappleJce,  Mustard",Prepared foods,Prepared meals
920553,"Beef Patty, Mashed  Potatoes, Corn",Prepared foods,Prepared meals
920652,"Beef Patty Potat.a Rounds, Mix Vegetable",Prepared foods,Prepared meals
920751,"Beef Patty, Tater Tots, Com",Prepared foods,Prepared meals
920859,"Beef Patty, Tater Tots, Peas",Prepared foods,Prepared meals
920958,"Beef/Bean Burrito, Formed Potato",Prepared foods,Prepared meals
921056,Chicken Prepared Meal,Prepared foods,Prepared meals
921155,"Chicken Nuggets, Potato Rounds",Prepared foods,Prepared meals
921254,"Chicken Thigh, Hashbrowns",Prepared foods,Prepared meals
921353,Chicken Biscuit,Prepared foods,Prepared meals
921452,Field Trip Lunch,Prepared foods,Prepared meals
921559,"French Toast,  Sausage",Prepared foods,Prepared meals
921659,"Fresh Apple,   Orange Juice,  Mustard",Prepared foods,Prepared meals
921758,"Fruit Cocktail, Apple Juice",Prepared foods,Prepared meals
921857,"Fruit Cup,  Grape Juice,  Mustard",Prepared foods,Prepared meals
921956,Ham Prepared Meal,Prepared foods,Prepared meals
922054,"Ham, Cheese, Cracker",Prepared foods,Prepared meals
922153,"Turkey,  Cheese,  Cracker",Prepared foods,Prepared meals
922252,"Macaroni and Cheese,    Peas",Prepared foods,Prepared meals
922359,"Meatloaf,   Mashed Potatoes, Green Bean",Prepared foods,Prepared meals
922459,"Meatloaf, Mashed Potatoes, Peas",Prepared foods,Prepared meals
922558,"Peach Cup, Apple Juice, Ketchup",Prepared foods,Prepared meals
922657,"Peach Cup, Apple juice,  Mayo",Prepared foods,Prepared meals
922756,"Peach Cup, Apple Juice, Mustard",Prepared foods,Prepared meals
922855,"Peach Cup, Applecran Juice, Ketchup",Prepared foods,Prepared meals
922954,"Peach Cup, Applecran Juice, Mustard",Prepared foods,Prepared meals
923052,"Peach Cup, Grape juice. Mayo",Prepared foods,Prepared meals
923159,"Peach Cup, Orange Juice, Mustard",Prepared foods,Prepared meals
923259,"Salisbury Steak, Tater Tots, Pea",Prepared foods,Prepared meals
923358,Turkey Prepared Meal,Prepared foods,Prepared meals
923457,"Turkey Frank, Tater Tots, Vege Beans",Prepared foods,Prepared meals
923556,"Turkey Nugget, Potato Rounds, Com",Prepared foods,Prepared meals
923655,"Turkey Nugget, Tater Tots, Com",Prepared foods,Prepared meals
923754,"Turkey Roll, Pot Salad, Peach, Cracker",Prepared foods,Prepared meals
923853,"Turkey Sandwich, Donut",Prepared foods,Prepared meals
923952,"Meatballs, Noodles",Prepared foods,Prepared meals
923952,"French Toast, Bacon",Prepared foods,Prepared meals
924059,Chili and Cornbread,Prepared foods,Prepared meals
924158,"Salisbury Steak, Green Vegetable",Prepared foods,Prepared meals
924257,Country Fried Steak Meal,Prepared foods,Prepared meals
924356,Grilled Cheese Meal,Prepared foods,Prepared meals
924455,Spaghetti and Meat Sauce Meal,Prepared foods,Prepared meals
924554,Smoked Sausage Meal,Prepared foods,Prepared meals
924653,Fish Stick Meal,Prepared foods,Prepared meals
924752,"Macaroni and Cheese, Turkey Ham",Prepared foods,Prepared meals
924851,Hot Dog. Baked Beans,Prepared foods,Prepared meals
924950,"Hot Dog, Formed Potatoes",Prepared foods,Prepared meals
925057,"Beef Taco, Rice",Prepared foods,Prepared meals
925158,"Comdog,  Formed Potatoes",Prepared foods,Prepared meals
925255,"Chicken Patty, Formed Potatoes",Prepared foods,Prepared meals
925354,"Bologna, Cheese, Cracker",Prepared foods,Prepared meals
925450,Meal Component Kit,Prepared foods,Prepared Meals
926014,Chips & Dip,Prepared foods,Prepared meals
980086,"Additional Charges (Fuel, tax, delivery)",Charges,Charges
999933,Ice,Non dairy drinks,Water
999968,"Energy Shots/Protein Drinks (RedBull,Monster)",Non dairy drinks,Enriched drinks
999974,"Water, Flavored     ",Non dairy drinks,Water
999984,"Sport Drink, e.g.Gatorade""",Non dairy drinks,Enriched drinks
999999,Water,Non dairy drinks,Water
`;

export default foodData; 