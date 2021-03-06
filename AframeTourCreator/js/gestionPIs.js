$ = (el) => document.querySelector(el);
$$ = (el) => document.querySelectorAll(el);

var mapPosPoints = new Map();
var addEnCours=false;
var lieu="";
var defhud = true;
var nbHud = 1;

function placementPoint(point){
  if(lieu=="point"){
    var scroll = event.deltaY/100;
    scrollDown = scroll > 0;
    scrollUp = scroll < 0;
    pos = point.getAttribute("position");
    if((pos.z>=-2 && scrollUp) || (pos.z<=-30 && scrollDown) || (pos.z<-2 && pos.z>-30)){
      pos.z = pos.z+scroll;
    }
    point.setAttribute("position",pos);
  }
}

function placementPann(pann){
  if(lieu=="pann"){
    var scroll = event.deltaY/100;
    scrollDown = scroll > 0;
    scrollUp = scroll < 0;
    posPan = pann.getAttribute("position");
    if((posPan.z>=-2 && scrollUp) || (posPan.z<=-15 && scrollDown) || (posPan.z<-2 && posPan.z>-15)){
      //dist = dist+scroll;
      posPan.z=posPan.z+scroll;
    }
  /*        var angle = ($("#camera").getAttribute("rotation").y+$("#cameraRotation").getAttribute("rotation").y) * Math.PI / 180;
    posPan = $("#"+idHud).getAttribute("position");
    var xPos = -dist*Math.sin(angle);
    var zPos = -dist*Math.cos(angle);
    var yPos = dist*Math.tan(angleX);*/
    pann.setAttribute('position',posPan);
  }
}

document.addEventListener('keypress', (event) => {
  const Touche = event.key;
  if(Touche=='a' && !addEnCours){
    alert("Appuyez sur entrée pour valider");
    addEnCours = true;
    lieu="point";
    var point = document.createElement("a-entity");
    point.setAttribute("template", "src: #template");
    point.setAttribute("data-target", "");
    point.setAttribute("position", "0 0 -5");
    point.setAttribute("data-childrotation", "10 0 0");
    $("#camera").appendChild(point);

    document.addEventListener('mousewheel', () => { placementPoint(point); });

    document.addEventListener('keypress', (event) => {
      if(event.keyCode==13 && lieu=="point"){
        var dist = -point.getAttribute("position").z;
        var angle = ($("#camera").getAttribute("rotation").y+$("#cameraRotation").getAttribute("rotation").y) * Math.PI / 180;
        var xPos = -dist*Math.sin(angle);
        var zPos = -dist*Math.cos(angle);
        var angleX = ($("#camera").getAttribute("rotation").x+$("#cameraRotation").getAttribute("rotation").x) * Math.PI / 180;
        var yPos = dist*Math.tan(angleX);
        $("#camera").removeChild(point);
        ajouterPointInteret(`${xPos} ${yPos} ${zPos}`,`0 ${angle*(180/Math.PI)} 0`);
        document.removeEventListener('mousewheel',  () => { placementPoint(point); });
        lieu="";
        addEnCours = false;
      }
    });
  }
  if(Touche=='p' && !addEnCours){
    alert("Appuyez sur entrée pour valider");
    addEnCours = true;
    lieu="pann";
    var dist = 5;
    var panneau = document.createElement("a-entity");
    panneau.setAttribute("class",idHud);
    panneau.setAttribute("template","src: #templateHud");
    panneau.setAttribute("position","0 0 -"+dist);
    panneau.setAttribute("data-text","");
    $("#camera").appendChild(panneau);


    document.addEventListener('mousewheel', () => { placementPann(panneau); });

    document.addEventListener('keypress', (event) => {addPann(event, dist, panneau)});

  }
  if(Touche=='r' && !addEnCours){
    var el = $("#cursor").components.raycaster.intersectedEls[0];
    if(el !== undefined){
      if(confirm("supprimer?")){
        supprimer(el);
      }
    }
  }
  if(Touche=='s' && !addEnCours){
    if(confirm("Voulez-vous sauvegarder cette pièce ?")){
      sauvegarder();
    }
  }
});


function addPann(event, dist, panneau){
    if(event.keyCode==13 && lieu=="pann"){
        var dist = -panneau.getAttribute("position").z;
        var angle = ($("#camera").getAttribute("rotation").y+$("#cameraRotation").getAttribute("rotation").y) * Math.PI / 180;
        var xPos = -dist*Math.sin(angle);
        var zPos = -dist*Math.cos(angle);
        var angleX = (($("#camera").getAttribute("rotation").x+$("#cameraRotation").getAttribute("rotation").x) * Math.PI / 180);
        var yPos = dist*Math.tan(angleX);
        $("#camera").removeChild(panneau);
        ajouterPann(`${xPos} ${yPos} ${zPos}`);
        addEnCours = false;
        lieu="";
        document.removeEventListener('mousewheel', () => { placementPann(panneau); });
        document.removeEventListener('keypress', (event) => {addPann(event, dist, panneau)});
        if(defhud){
            $("#cameraRotation").removeChild($("#hudDef"));
            defhud=false;
        }
        else{
            nbHud++;
        }
    }
}

/*AFRAME.registerComponent('move', {
  schema: {
    on: {type: 'string'},
    target: {type: 'string'}
  },

  init: function(){
    var data=this.data;
    var el=this.el;
    var originPlaceName = el.parentNode.parentNode.getAttribute('id');
    var targetElement=$(`#${data.target}`);
    var targetWorldPos = new THREE.Vector3();
    el.addEventListener(data.on, function(){
        var image=$(`#${data.target}Img`);
        if(image.nodeName!="IMG"){
          var source=image.innerHTML;
          var parentImage=image.parentNode;
          parentImage.removeChild(image);
          image=document.createElement("img");
          image.setAttribute("id", `${data.target}Img`);
          image.setAttribute("crossorigin", "anonymous");
          image.setAttribute("src", source);
          parentImage.appendChild(image);
        }
        $("#background").setAttribute('src', `#${data.target}Img`);

        var elementToHaveInTheBack=elementInWithTarget(data.target, originPlaceName);
        if (typeof elementToHaveInTheBack !== 'undefined') {
          targetWorldPos.setFromMatrixPosition(elementToHaveInTheBack.object3D.matrixWorld);
          $("#cameraRotation").setAttribute("rotation", `0 ${Math.atan2(targetWorldPos.x, targetWorldPos.z)*(180/Math.PI)-$("#camera").getAttribute("rotation").y} 0`);
        }
        
        
        el.parentNode.parentNode.setAttribute('visible','false');       
        el.parentNode.parentNode.removeAttribute("current");
        targetElement.setAttribute('visible', 'true');
        targetElement.setAttribute("current","");
        //$("#"+idHud).setAttribute('text','value', targetElement.getAttribute('description'));
        $("#cursor").setAttribute('raycaster', `objects: #${data.target}`);
      }
    );
  }
});*/

AFRAME.registerComponent('default', {
  schema: {
  },

  init: function(){
    var el = this.el;
    var image=$(`#${el.id}Img`);
    var source=image.innerHTML;
    var parentImage=image.parentNode;
    parentImage.removeChild(image);
    image=document.createElement("img");
    image.setAttribute("id", `${el.id}Img`);
    image.setAttribute("crossorigin", "anonymous");
    image.setAttribute("src", source);
    parentImage.appendChild(image);
    $("#background").setAttribute('src', `#${el.id}Img`);
    //$("#"+idHud).setAttribute('text','value', el.getAttribute('description'));
    el.setAttribute('visible', 'true');
    el.setAttribute("current","");
    $("#cursor").setAttribute('raycaster', `objects: #${el.id}`);
  }
});

AFRAME.registerComponent('sourceimage', {
  schema: {type: 'string'},

  init: function(){
    var div = document.createElement("div");
    div.setAttribute("id", this.el.getAttribute("id")+"Img");
    div.innerHTML=this.data;
    $("a-assets").appendChild(div);
  }
});

function ajouterPann(pos){
    var target = window.prompt("Description :");
    while(target==""){
        var target = window.prompt("Description :");
    }
    var currentPlace = $(".imsky");

    var pann = document.createElement("a-entity");
    pann.setAttribute("class",idHud);
    pann.setAttribute("template","src: #templateHud");
    pann.setAttribute("position",pos);
    pann.setAttribute("data-text",target);
    currentPlace.appendChild(pann);

    var form = $("#pointsForm");
    var inputPos = document.createElement("input");
    inputPos.setAttribute("type", "text");
    inputPos.setAttribute("name", "listPanns["+currentPlace.getAttribute('id')+"][]");
    inputPos.setAttribute("hidden", "");
    inputPos.setAttribute("value", pos);
    form.appendChild(inputPos);

    var inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("name", "listTextPanns["+currentPlace.getAttribute('id')+"][]");
    inputText.setAttribute("hidden", "");
    inputText.setAttribute("value", target);
    form.appendChild(inputText);
}

function ajouterPointInteret(pos, rot){              
    if(typeof(listImgs)=="undefined"){
      alert("Erreur");
      return;
    }
    var l = listImgs.split(':');
    var currentPlace = $(".imsky");
    var point = document.createElement("a-entity");
    point.setAttribute("template", "src: #template");
    var target = window.prompt("Destination ( nom de l'image (sans l'extension))?");
    if(target==null){
      return;
    }
    while(l.includes(target)==false || target == currentPlace.getAttribute("id")){
      alert("Destination incorrecte, veuillez entrer un endroit existant différent du lieu actuel");
      var target = window.prompt("Destination ( nom de l'image (sans l'extension))?");
      if(target==null){
        return;
      }
    }

    point.setAttribute("data-target", target);
    point.setAttribute("position", pos);
    point.setAttribute("data-childrotation", rot);
    currentPlace.appendChild(point);


    var form = $("#pointsForm");
    var inputPos = document.createElement("input");
    inputPos.setAttribute("type", "text");
    inputPos.setAttribute("name", "pointsPos["+currentPlace.getAttribute('id')+"][]");
    inputPos.setAttribute("hidden", "");
    inputPos.setAttribute("value", pos);

    var inputTarget = document.createElement("input");
    inputTarget.setAttribute("type", "text");
    inputTarget.setAttribute("name", "pointsTarget["+currentPlace.getAttribute('id')+"][]");
    inputTarget.setAttribute("hidden", "");
    inputTarget.setAttribute("value", target);

    var inputRot = document.createElement("input");
    inputRot.setAttribute("type", "text");
    inputRot.setAttribute("name", "pointsRot["+currentPlace.getAttribute('id')+"][]");
    inputRot.setAttribute("hidden", "");
    inputRot.setAttribute("value", rot);

    form.appendChild(inputPos);
    form.appendChild(inputTarget);
    form.appendChild(inputRot);
}

function ajouterPointInteretDebut(pos,target,rot){              
    var currentPlace = $(".imsky");
    var point = document.createElement("a-entity");
    point.setAttribute("template", "src: #template");
    point.setAttribute("data-target", target);
    point.setAttribute("position", pos);
    point.setAttribute("data-childrotation", rot);
    currentPlace.appendChild(point);
}

function placerPannDebut(pos,text){
    if(defhud){
        $("#cameraRotation").removeChild($("#hudDef"));
        defhud=false;
        nbHud--;
    }
    var pann = document.createElement("a-entity");
    pann.setAttribute("class",idHud);
    pann.setAttribute("template","src: #templateHud");
    pann.setAttribute("position",pos);
    pann.setAttribute("data-text",text);
    $(".imsky").appendChild(pann);
    nbHud++;
}


function supprimer(el){
    elmt = el.parentNode;
    var currentPlace = $(".imsky");
    var form = $("#pointsForm");
    if(elmt.getAttribute("class")==null){
        var p = document.getElementsByName("pointsPos["+currentPlace.getAttribute('id')+"][]");
        var d = document.getElementsByName("pointsTarget["+currentPlace.getAttribute('id')+"][]");
        var r = document.getElementsByName("pointsRot["+currentPlace.getAttribute('id')+"][]");
        i=0;
        var posP = elmt.parentNode.parentNode.getAttribute("position");
        p.forEach(function(pF, index){
            var point = pF.getAttribute("value");
            if(point==posP.x+" "+posP.y+" "+posP.z){
              i = index;
              form.removeChild(pF);
            }
        });
        form.removeChild(d[i]);
        form.removeChild(r[i]);
        elmt.parentNode.parentNode.parentNode.removeChild(elmt.parentNode.parentNode);
    }
    else{
        var panns = document.getElementsByName("listPanns["+currentPlace.getAttribute('id')+"][]");
        var t = document.getElementsByName("listTextPanns["+currentPlace.getAttribute('id')+"][]");
        i=0;
        var posP = elmt.getAttribute("position");
        panns.forEach(function(pa, index){
            var pann = pa.getAttribute("value");
            if(pann==posP.x+" "+posP.y+" "+posP.z){
                i = index;
              form.removeChild(pa);
            }
        });
        form.removeChild(t[i]);
        
        if(nbHud==1 && !defhud){
            var pannDef = document.createElement("a-entity");
            pannDef.setAttribute("class",idHud);
            pannDef.setAttribute("id","hudDef");
            pannDef.setAttribute("template","src: #templateHud");
            pannDef.setAttribute("position","0 -2 -1");
            pannDef.setAttribute("data-text",$(".imsky").getAttribute('id'));
            $("#cameraRotation").appendChild(pannDef);
            defhud=true;
        }
        else{ 
            nbHud--;
        }
        elmt.parentNode.removeChild(elmt);

    }
}

function sauvegarder(){
    document.getElementById("pointsForm").submit();
}


function creerHud(pos,text){
    var pann = document.createElement("a-entity");
    pann.setAttribute("class",idHud);
    pann.setAttribute("template","src: #templateHud");
    pann.setAttribute("position",pos);
    pann.setAttribute("data-text",text);
    return pann;
}