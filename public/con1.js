 angular.module('myapp',[])
    .controller('con1',function($scope,$window,$http,$sce){
       $scope.query='';
       $scope.lists=[];
       $scope.songs=[];
     var postCfg = {
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },    
  transformRequest: function(obj) {    
          var str = [];    
          for (var s in obj) {    
            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));    
          }    
          return str.join("&");    
        }  
     };

       $scope.flush= function(){
        $http.post('http://localhost:3000/test',{query:$scope.query},postCfg).success(function(data){
              //console.log('data:'+ data);
              //delete '();' in the str;
              data=data.replace(/\(/,'');
              data=data.replace(/\)/,'');
              data=data.replace(/\;/,'');
              
              data=JSON.parse(data);
              $scope.lists=data.album;
              $scope.songs=data.song;
              //$scope.response=data;
              console.log(data);

        });
       };

        $scope.get=function(){
          $scope.query=$scope.str;
          $scope.flush();
         };

         $scope.replace_data = function(data){
             var x=[];
 
         };
         $scope.play=function($index){
             console.log($index);
              $http.post('http://localhost:3000/play',{id:$scope.songs[$index].songid},postCfg).success(function(data){
            console.log(data.bitrate.show_link); 
            //$scope.mysrc=$sce.trustAsResourceUrl(data.bitrate.show_link);
            //发现服务器不允许联网域名下访问，只能桌面静态html访问
           // document.querySelector('#music').src=data.bitrate.show_link;
             $scope.music_info=$scope.songs[$index].songname;
            $scope.download_url=data.bitrate.show_link;
              });
             
         };
        });