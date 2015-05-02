/*transpose function for matrix operations*/
Array.prototype.transpose = function () {
    var a = this,
        w = a.length ? a.length : 0,
        h = a[0] instanceof Array ? a[0].length : 0;
    if (h === 0 || w === 0) {
        return [];
    }
    var i, j, t = [];
    for (i = 0; i < h; i++) {
        t[i] = [];
        for (j = 0; j < w; j++) {
            t[i][j] = a[j][i];
        }
    }
    return t;
};

var totedges = 0;

/*row sum operation for matrix operations*/
function rowsums(mm) {
    totedges = 0;
    var mmlen = mm.length;
    var sumOfRows = new Array(mmlen);
    var sumR = 0;
    for (var row = 0; row < mmlen; row++) {
        for (var col = 0; col < mmlen; col++) {
            sumR += mm[row][col];
            totedges = totedges + (mm[row][col] / 2);
        }
        sumOfRows[row] = sumR;
        sumR = 0;
    }
    totedges = totedges - (2 * (mmlen - 1));
    return sumOfRows;
}

/*calculate the proportional strength of network edges (input for structural holes calculation)*/
function ptiestrength(Z) {
    Ztrans = Z.transpose();
    zlen = Z.length;
    znum = new Array(zlen);
    for (var l = 0; l < zlen; l++) {
        znum[l] = new Array(zlen);
    }
    for (var x = 0; x < zlen; x++) {
        for (var y = 0; y < zlen; y++) {
            znum[x][y] = Z[x][y] + Ztrans[x][y];
        }
    }
    dtemp = rowsums(znum);
    P = new Array(zlen);
    for (var k = 0; k < zlen; k++) {
        P[k] = new Array(zlen);
    }
    for (var i = 0; i < zlen; i++) {
        for (var j = 0; j < zlen; j++) {
            if (dtemp[i] > 0) {
                P[i][j] = znum[i][j] / dtemp[i];
            }
            if (dtemp[i] <= 0) {
                P[i][j] = 0;
            }
        }
    }
    return P;
}

/*calculate the structural holes index and its components*/
function structuralholes(Z) {
    aa = Z;
    var aalen = aa.length;
    var i = 0;
    P = ptiestrength(Z);
    var constraint = 0;
    var esize = 0;
    var csize = 0;
    var density = 0;
    var pubdensity = 0;
    var hierarchy = 0;
    var maxedges = (aalen - 1) * (aalen - 2) * 2;
    for (var j = 1; j < aalen; j++) {
        Pij = P[i][j];
        csize = csize + Math.pow(Pij, 2)
        var innersum = 0;
        for (var q = 1; q < aalen; q++) {
            if (q != j & q != i) {
                innersum = innersum + (P[i][q] * P[q][j])
            }
        }
        density = density + (2 * Pij * innersum)
        hierarchy = hierarchy + Math.pow(innersum, 2);
        esize = (aalen - 1) - ((totedges * 2) / (aalen - 1));
        asize = aalen - 1;
    }
    var betweenness=((aalen-1)*(aalen-2))/2;
    for(var i=1; i<aalen; i++)
    {
        var contacts=[];
        for (var j=i; j<aalen; j++) //start at i+1?
        {
            if(Z[i][j]==1)
            {
                betweenness=betweenness-1;
                contacts.push(j-1) //just j?
            }
        }
        for (var j=i+1; j<aalen; j++) //start at 1?
        {
            if(Z[i][j]==0)
            {
                var shared=0;
                for(k=0; k<contacts.length; k++)
                {
                    if (Z[j][contacts[k]]==1)
                    {
                        shared=shared+1;
                    }
                }
                if (shared>0)
                {
                    betweenness=betweenness-(shared/(shared+1));
                }
            }
        }
    }
    csize = csize * 100;
    density = density * 100;
    pubdensity=totedges/((aalen-1)*(aalen-2))/2*100;
    hierarchy = hierarchy * 100;
    constraint = csize + density + hierarchy;
    var asize = aalen - 1;
    var Csdhe = { constraint: constraint, csize: csize, density:density, hierarchy: hierarchy, esize: esize, asize: asize, pubdensity: pubdensity, betweenness: betweenness};
    return Csdhe;
}
//converts mutual connections array to adjacency matrix
function mutualConnectsToMatrix(mutualconnects) {
    var len = mutualconnects.length;
    var result = [];

    for (var i = 0; i < len + 1; i++) {
        result.push(new Array(len + 1));
        result[i][i] = 0;
        for (var j = 0; j < i; j++) {
            var value = (i == 0 || j == 0 || (mutualconnects[i - 1] && mutualconnects[i - 1].indexOf(j - 1) >= 0)) ? 1 : 0;
            result[i][j] = result[j][i] = value;
        }
    }

    return result;
}

//reduces network by removing ego node - used in the 'disable links to self' d3js option to 
//make internal structure of contacts more visible.
function mutualConnectsToReducedMatrix(mutualconnects) {
    var len = mutualconnects.length;
    var result = [];

    for (var i = 0; i < len; i++) {
        result.push(new Array(len));
        result[i][i] = 0;
        for (var j = 0; j < i; j++) {
            var value = 0;
            if (mutualconnects[i] && mutualconnects[i].indexOf(j) >= 0) {
                value = 1;
            }
            result[i][j] = result[j][i] = value;
        }
    }

    return result;
}

function loadConnectionsMatrix(user) {
  // load connections data
  var userLinkedinId = user.profile.id;
  var accessToken = user.services.linkedin.accessToken;
  var connections = Meteor.linkedinConnections.find({userLinkedInId: userLinkedinId}).fetch();
  connections = _.filter(connections, function(c){
    return c.id != 'private';
  });
  var mutualconnects = new Array(connections.length);
  var connectionIdIndexMap = {};
  connections.forEach(function (connection, connectionIndex) {
      connectionIdIndexMap[connection.id] = connectionIndex;
  });
  var getConnectionIndexById = function (d) {
      return connectionIdIndexMap[d.id];
  };
  _.each(connections, function(connection, index){
    var url = "https://api.linkedin.com/v1/people/" + connection.id + "/relation-to-viewer/related-connections?count=99"
    var result = Meteor.http.get(url, {
        params: {
            oauth2_access_token: accessToken,
            format: 'json'
        }
    }).data;
    mutualconnects[index] = ((result && result.values) ? result.values.map(getConnectionIndexById).filter(function (d) {
        return d != null && d <= 499;
      }) : []) || [];
  });
  var sociomat = mutualConnectsToMatrix(mutualconnects);
  var reducedSociomat = mutualConnectsToReducedMatrix(mutualconnects);
  var resultData = { connections: connections, publicConnections: connections, matrix: sociomat, reducedMatrix: reducedSociomat };
  var num = sociomat;
  var ntr = num.transpose();
  var rsum = rowsums(num);
  var z = ptiestrength(num);
  var holes = structuralholes(num);
  return holes;
}

Meteor.loadConnectionsMatrix = loadConnectionsMatrix
