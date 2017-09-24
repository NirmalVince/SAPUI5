sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("AnalyticalApplication.controller.View1", {
		onInit: function() {
			var oVizBar = this.getView().byId("idbar1");
			var oVizFrame = this.getView().byId("idpiechart");
			var oVizLine = this.getView().byId("idLine");
			var oModel = new sap.ui.model.json.JSONModel();
			$.ajax({
				url: "/northwind/V2/OData/OData.svc/Products?$format=json",
				dataType: 'json',
				success: function(response) {

					var data = response;
					oModel.setData(data);
				}

			});

			//For Pie Chart
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: 'ProductName',
					value: "{Name}"
				}],

				measures: [{
					name: 'Price',
					value: '{Price}'
				}],

				data: {
					path: "/d"
				}
			});
			oVizFrame.setDataset(oDataset);
			oVizFrame.setModel(oModel);
			oVizFrame.setVizProperties({
				title: {
					text: "Product Details (Product Name, Price)"
				},
				plotArea: {
					colorPalette: d3.scale.category20().range(),
					drawingEffect: "glossy"
				}
			});

			var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "size",
					'type': "Measure",
					'values': ["Price"]
				}),
				feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "color",
					'type': "Dimension",
					'values': ["ProductName"]
				});
			oVizFrame.addFeed(feedSize);
			oVizFrame.addFeed(feedColor);
			var vizDataSet = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: 'ProductName',
					value: "{Name}"
				}],
				measures: [{
					name: 'Rating',
					value: '{Rating}'
				}],
				data: {
					path: "/d"
				}
			});
			// For Viz Bar
			oVizBar.setDataset(vizDataSet);
			oVizBar.setModel(oModel);
			oVizBar.setVizType('bar');
			oVizBar.setVizProperties({
				title: {
					text: "Product Details (Product Name, Rating)"
				},
				plotArea: {
					colorPalette: d3.scale.category20().range(),
					drawingEffect: "glossy"
				}
			});

			var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "valueAxis",
					'type': "Measure",
					'values': ["Rating"]
				}),
				feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "categoryAxis",
					'type': "Dimension",
					'values': ["ProductName"]
				});
			oVizBar.addFeed(feedValueAxis);
			oVizBar.addFeed(feedCategoryAxis);
			//For Line chart
			var vizDataSetLine = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: 'ProductName',
					value: "{Name}"
				}],
				measures: [{
					name: 'Price',
					value: '{Price}'
				}],
				data: {
					path: "/d"
				}
			});
			oVizLine.setDataset(vizDataSetLine);
			oVizLine.setModel(oModel);
			oVizLine.setVizType('line');
			oVizLine.setVizProperties({
				title: {
					text: "Product Details (Product Name, Price)"
				},
				plotArea: {
					colorPalette: d3.scale.category20().range(),
					drawingEffect: "glossy"
				}
			});

			var feedValueAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "valueAxis",
					'type': "Measure",
					'values': ["Price"]
				}),
				feedCategoryAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "categoryAxis",
					'type': "Dimension",
					'values': ["ProductName"]
				});
			oVizLine.addFeed(feedValueAxis1);
			oVizLine.addFeed(feedCategoryAxis1);

			//For Map
			var oGeoMap = this.getView().byId("GeoMap");
			var mapModel = new sap.ui.model.json.JSONModel();
			var oData = {
				'mapData': [{
						"latitude": "28.6699929",
						"longitude": "77.23000403",
						"EventName": "India"
					}, {
						"latitude": "-23.533773",
						"longitude": "-46.625290",
						"EventName": "Brazil"
					}, {
						"latitude": "35.8617° N",
						"longitude": "104.1954° E",
						"EventName": "China"
					},  {
						"latitude": "41.8719° N",
						"longitude": "12.5674° E",
						"EventName": "Italy"
					}, {
						"latitude": "40.4637° N",
						"longitude": "3.7492° W",
						"EventName": "Spain"
					}, {
						"latitude": "48.864716",
						"longitude": "2.349014",
						"EventName": "France"
					}

				]
			};
			mapModel.setData(oData);
			oGeoMap.setModel(mapModel);
			sap.ui.getCore().setModel(mapModel, "mModel");

			var oMapConfig = {
				"MapProvider": [{
					"name": "GMAP",
					"Source": [{
						"id": "GeoMap",
						"title": "GeoMap",
						"url": "https://mt.google.com/vt/x={X}&y={Y}&z={LOD}"
					}]
				}],
				"MapLayerStacks": [{
					"name": "DEFAULT",
					"MapLayer": {
						"name": "layer1",
						"refMapProvider": "GMAP",
						"opacity": "1",
						"colBkgnd": "RGB(255,255,255)"
					}
				}]
			};
			oGeoMap.setMapConfiguration(oMapConfig);
			oGeoMap.setRefMapLayerStack("DEFAULT");
			oGeoMap.setInitialZoom(0);
			//oGeoMap.setCenterPosition("20.5937;78.9629;0");
			oGeoMap.setInitialPosition("20.5937° N;78.9629° E;0");

		}

	});
});