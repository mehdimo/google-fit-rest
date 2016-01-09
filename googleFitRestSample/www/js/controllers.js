angular.module('starter.controllers', [])

.controller('gFitRestCtrl', function($scope) {
	$scope.dsnames = [];	
	
	// You need to get your own OAuth token, described in Readme file.
	var authCode = 'Bearer '; 
	authCode += 'ya29.ZAL1gK3z431gfk5II9GRnO6xyAT5EMe17MS6hz-m23oVCVNJI7kwfAxFxq_vpsAJoFABPQ';
	
	$scope.getDatasource = function(){
		var req_url = "https://www.googleapis.com/fitness/v1/users/me/dataSources";
		$.ajax({
            type: "GET",
            url: req_url,
            beforeSend : function( xhr ) {
                xhr.setRequestHeader('Authorization', authCode);
            },
            success: function (response) {
                
                var dss = response['dataSource'];
                var dsname = [];
                for (i = 0; i < dss.length; i++) { 
                	dsname.push(dss[i].dataStreamId);
                }
                $scope.dsnames = dsname;             
                console.log(response);
                $scope.$apply();
            }
        });
	}
	
	$scope.postDatasource = function(){
		// we use different device uid to distinguish different data sources of a same type.
		var req_url = "https://www.googleapis.com/fitness/v1/users/me/dataSources/";
		var userDeviceId = 100011;
		// You may need dsId.
		var dsId = "derived:com.google.step_count.delta:924675608361:Example Manufacturer3:ExampleTablet:"+ userDeviceId +":";
		$.ajax({
            type: "POST",
            url: req_url,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify( {
          	  "dataStreamId": dsId,
        	  "dataStreamName": "",
        	  "name": "myDataSource3",
        	  "type": "derived",
        	  "application": {
        	    "detailsUrl": "http://example.com",
        	    "name": "apptest",
        	    "version": "1"
        	  },
        	  "dataType": {
        	    "field": [
        	      {
        	        "name": "steps",
        	        "format": "integer"
        	      }
        	    ],
        	    "name": "com.google.step_count.delta"
        	  },
        	  "device": {
        	    "manufacturer": "Example Manufacturer3",
        	    "model": "ExampleTablet",
        	    "type": "tablet",
        	    "uid": userDeviceId,
        	    "version": "1"
        	  }
        	}),

            beforeSend : function( xhr ) {
                xhr.setRequestHeader('Authorization', authCode);
            },
            success: function (response) {
                console.log(response);                
                alert('DataSource was created with id: ' + dsId);
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
            
        });
	}
	$scope.getDatapoint = function(){
		var req_url = "https://www.googleapis.com/fitness/v1/users/me/dataSources/";
		req_url += "derived:com.google.step_count.delta:924675608361:Example Manufacturer3:ExampleTablet:1000001:/datasets/1397513334728708316-1397513675197854515";
		$.ajax({
            type: "GET",
            url: req_url,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
                       
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( 'Authorization', authCode);
            },
            success: function (response) {
                console.log(response);
                dpts = [];
                var dp = response['point'];
                for (i = 0; i < dp.length; i++) { 
                	dpts.push(dp[i].value[0]);
                }
                $scope.dataPoints = dpts;                             
                $scope.$apply();
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
            
        });
	}
	$scope.sendDatapoint = function(){
		var dataVal = 88;
		var req_url = "https://www.googleapis.com/fitness/v1/users/me/dataSources/";
		req_url += "derived:com.google.step_count.delta:924675608361:Example Manufacturer3:ExampleTablet:1000001:/datasets/1397513334728708316-1397513365565713993";
		$.ajax({
            type: "PATCH",
            url: req_url,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
           data: JSON.stringify(
        		   {
        			   "dataSourceId":
        			       "derived:com.google.step_count.delta:924675608361:Example Manufacturer3:ExampleTablet:1000001:",
        			   "maxEndTimeNs": 1397513365565713993,
        			   "minStartTimeNs": 1397513334728708316,
        			   "point": [
        			             {
        			                 "dataTypeName": "com.google.step_count.delta",
        			                 "endTimeNanos": 1397513365565713993,
        			                 "originDataSourceId": "",
        			                 "startTimeNanos": 1397513334728708316,
        			                 "value": [
        			                   {
        			                     "intVal": dataVal
        			                   }
        			                 ]
        			               }
        			             ]
        			 }
           	),
            
            
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( 'Authorization', authCode);
            },
            success: function (response) {
                console.log(response);
                
                alert('Data point was created, value = ' + dataVal);
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
            
        });
	}
});
