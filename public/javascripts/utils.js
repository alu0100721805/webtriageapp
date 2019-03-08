
    // Description: Calculate distance between two tags
    function calculateDistance (tag1,tag2){
        let R = 6378137;
        let rad = function(x) {return x*Math.PI/180;};
        let difLat = rad(tag2.latitud - tag1.latitud);
        let difLong = rad( tag2.longitud - tag1.longitud);
        let a = Math.sin(difLat/2) * Math.sin(difLat/2) + Math.cos(rad(tag1.latitud)) * Math.cos(rad(tag2.latitud)) * Math.sin(difLong/2) * Math.sin(difLong/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c;
        return d.toFixed(4);
        
    }
    // Description: Nearest tag to a given tag
  function nearestPoint (tagorigin,arrTags){
    let cost = 0;
    let tagnearest = null;
    if (arrTags != null){
        for (let i = 0; i < arrTags.length; i++) {
          let currentcost = utils.calculateDistance(tagorigin,arrTags[i]);
          if (tagnearest == null || currentcost < cost){
              cost = currentcost;
              tagnearest = arrTags[i];
          }
        }
    }
    return tagnearest;
      
  }
    
    // Description: Return best route for the set of tags
    function bestCurrentRoute (tagorigin,arrtags) {
     var bestsettags = null;
     var copyarrtags = null;
     if (arrtags != null){
        bestsettags = new Array(arrtags.length);
        copyarrtags = new Array(arrtags.length);
        // copy of arrTag
        for (var i = 0; i < arrtags.length; i++) {
          copyarrtags[i] = arrtags[i];
        }
        var currenttag = tagorigin;
        // foreach tag search tag nearest and add
        for (var i = 0; i < arrtags.length; i++) {
          bestsettags[i] = currenttag;
          copyarrtags.splice( copyarrtags.indexOf(currenttag.id), 1);
          currenttag = utils.nearestPoint(currenttag,copyarrtags);
        }
        return bestsettags;
    }else
    {
        return null;
    }
    }
    // Description: Best route for all posibilities
    function bestRouteAllPosibilities(arrtags){
   var bestsettags = null;
   if (arrtags != null){
       for (var i = 0; i < arrtags.length; i++) {
               var currentsettags  = utils.bestCurrentRoute(arrtags[i],arrtags);
               var currentroutecost = utils.totalRouteCost(currentsettags);
               var bestsettagscost = utils.totalRouteCost(bestsettags);
               if(bestsettags == null || currentroutecost > bestsettagscost){
                   bestsettags = currentsettags;
               }
        }
   }
    return bestsettags;}
    
    //Description: Return cost of route tags
   function totalRouteCost  (arrtags) {
     var cost = null;
     if (arrtags != null){
          cost = 0;
          for (var i = 0; i < arrtags.length; i++) {
               if(i + 1 < arrtags.length){
                   cost = cost + utils.calculateDistance(arrtags[i],arrtags[i+1]);
               }else
               {
                   cost = utils.calculateDistance(arrtags[0],arrtags[i]);
               }
           }
           return cost;
     }else 
        return null;
        
    }












  